  // Select important elements from the DOM
      let form = document.querySelector(".input-fields");
      let Nameinput = document.querySelector("#Name");
      let Emailinput = document.querySelector("#Email");
      let Tablebody = document.querySelector("tbody");

      // Array to store all data entries
      let Enteries = [];

      // Track which entry is being edited
      let Editindex = null;

      // Handle form submission (Add or Update)
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        let Name = Nameinput.value.trim();
        let Email = Emailinput.value.trim();

        if (Name === "" || Email === "") {
          alert("Please fill both fields");
          return;
        }

        if (Editindex === null) {
          // Create new entry
          let Entery = {
            id: Date.now(),
            Name,
            Email,
          };
          Enteries.push(Entery);
        } else {
          // Update existing entry
          Enteries[Editindex].Name = Name;
          Enteries[Editindex].Email = Email;
          Editindex = null;
        }

        Nameinput.value = "";
        Emailinput.value = "";

        rendertable();
      });

      // Function to display all entries in the table
      let rendertable = () => {
        Tablebody.innerHTML = "";

        Enteries.forEach((Entery, index) => {
          let Row = document.createElement("tr");

          Row.innerHTML = `
            <td>${index + 1}</td>
            <td>${Entery.Name}</td>
            <td>${Entery.Email}</td>
            <td>
              <button class="edit-btn" onclick="EditEntery(${index})">Edit</button>
              <button class="delete-btn" onclick="DeleteEntery(${index})">Delete</button>
            </td>
          `;

          Tablebody.appendChild(Row);
        });
      };

      // Function to handle Edit button click
      window.EditEntery = (index) => {
        let Entery = Enteries[index];
        Nameinput.value = Entery.Name;
        Emailinput.value = Entery.Email;
        Editindex = index;
      };

      // Function to handle Delete button click
      window.DeleteEntery = (index) => {
        Enteries.splice(index, 1);
        rendertable();
      };