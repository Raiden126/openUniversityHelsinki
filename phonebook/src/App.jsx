import { useEffect, useState } from 'react';
import Filter from './Filter';
import PersonsForm from './PersonsForm';
import Persons from './Persons';
import backendServer from './services/Name&No';
import Notification from './Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState(null)

  const handleFilter = (e) => {
    setSearch(e.target.value);
  };

  const handleName = (e) => {
    const inputType = e.target.value;
    setNewName(inputType);
  };

  const handlePhone = (e) => {
    setNumber(e.target.value);
  };

  const addName = (e) => {
    e.preventDefault();

    setNotification(`Added ${newName}`)
      setTimeout(() => {
        setNotification(null)
      }, 3000);

    const existingPerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase());

    if (existingPerson) {
      const confirmUpdate = window.confirm(`${newName} is already in the phonebook. Do you want to update the phone number?`);

      if (confirmUpdate) {
        const updatedPersons = persons.map((person) =>
          person.id === existingPerson.id ? { ...person, number: number } : person
        );

        backendServer
          .updatePerson(existingPerson.id, { ...existingPerson, number: number })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error("Error updating person:", error);
          });

        setPersons(updatedPersons);
        setNewName('');
        setNumber('');

        return;
      }
      
    }

    const newPerson = { name: newName, number: number };

    backendServer
      .create(newPerson)
      .then((response) => {
        console.log(response);
        setPersons([...persons, response.data]);
      })
      .catch((error) => {
        console.error("Error adding person:", error);
      });

    setNewName('');
    setNumber('');
  };

  useEffect(() => {
    backendServer
      .getAll()
      .then((response) => {
        console.log(response);
        const person = response.data;
        console.log(person);
        setPersons(person);
      })
      .catch((error) => {
        console.error("Error fetching persons:", error);
      });
  }, []);

  const deleteBtn = (id) => {
    const deletedInformation = persons.filter((item) => item.id !== id);
    setPersons(deletedInformation);

    backendServer
      .deletePerson(id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error deleting person:", error);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {notification} />
      <Filter search={search} onChange={handleFilter} />

      <form>
        <h1>add a new</h1>
        <PersonsForm value={newName} onChange={handleName} onClick={addName} number={number} phoneOnChange={handlePhone} />
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} onClick={deleteBtn} />
    </div>
  );
};

export default App;
