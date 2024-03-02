import { useEffect, useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import axios from 'axios'
import PersonDb from './services/PersonDb'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)

  const handleFilter = (e) => {
    setSearch(e.target.value)
  }

  const handleName = (e) => {
    setNewName(e.target.value)
  }

  const handleNumber = (e) => {
    setNumber(e.target.value)
  }

  const showMesage = (message, type = 'success') => {
    setMessage({ message, type })
    setTimeout(() => {
      setMessage(null)
    }, 2000);
  }

  const handlePersons = (e) => {
    e.preventDefault();

    const existingPerson = persons.find((item) => item.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with a new one?`
      );

      if (confirmUpdate) {
        PersonDb.update(existingPerson.id, { name: newName, number: number })
          .then(() => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id
                  ? { ...person, number: number }
                  : person
              )
            );
            setNewName('');
            setNumber('');
            showMesage(`Phone number for ${newName} is updated successfully`, 'success')
          })
          .catch((error) => {
            console.log('Error updating number:', error);
            showMesage(
              `Failed to update phone number for ${newName}. Please try again later.`,
              'error'
            );
          });
      }
    } else {
      PersonDb.create({ name: newName, number: number })
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNumber('');
          showMesage(`added ${newName}`, 'success')
        })
        .catch((error) => {
          showMesage(
            `${error.response.config.data} name is shorter than the minimum allowed length(3)`
          );
          console.log(error.response.config.data);
        });
    }
  };

  useEffect(() => {
    PersonDb
      .getAll()
      .then(response => {
        const res = response.data
        setPersons(res)
      })
      .catch((error) => {
        console.log('Error generating Data:', error)
      })
  }, [])

  const deleteNameAndNum = (id, name) => {
    if (window.confirm(`delete ${name} ?`)) {
      PersonDb
        .deleteData(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch((error) => {
          console.log('error deleting enry', error)
          setMessage(`Information of ${newName} is already removed from server`, 'error')
        })
    }
  }

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        {message && (
          <div
            style={{
              color: message.type === 'error' ? 'red' : 'green',
              border: `1px solid ${message.type === 'error' ? 'red' : 'green'}`,
              backgroundColor: 'gray',
              padding: 2,
              fontSize: 20,
            }}
          >
            {message.message}
          </div>
        )}
        <Filter value={search} onChange={handleFilter} />
        <PersonForm
          name={newName}
          nameOnChange={handleName}
          number={number}
          numberOnChange={handleNumber}
          onSubmit={handlePersons}
        />
        <h2>Numbers</h2>
        <Persons persons={persons} search={search} onDelete={deleteNameAndNum} />
      </div>
    </>

  )
}

export default App