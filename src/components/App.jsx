import { useState, useEffect } from 'react';

import { PhoneBook } from './phoneBook/PhoneBook';
import { ContactsList } from './contactsList/ContactsList';
import { nanoid } from 'nanoid';
import { SearchFilter } from './searchFilter/SearchFilter';
import { Section } from './section/Section';
import styles from './App.module.css';

export const App = () => {
  const initiateContacts = () =>
    JSON.parse(localStorage.getItem('LOCALSTORAGE_KEY')) || [];

  const [contacts, setContacts] = useState(initiateContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    try {
      const initiateContacts = JSON.stringify(contacts);
      localStorage.setItem('LOCALSTORAGE_KEY', initiateContacts);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }, [contacts]);

  // useEffect(() => {}, [filter]);

  const addNewContact = ({ name, number }) => {
    if (contacts.find(cont => cont.name === name)) {
      alert(`${name} is already in contacts`);
    } else {
      setContacts(oldCont => [...oldCont, { name, number, id: nanoid() }]);
    }
  };

  const searchByName = e => {
    setFilter(() => e.target.value.toLowerCase());
  };

  const viewContacts = () => {
    return contacts.filter(cont => cont.name.toLowerCase().includes(filter));
  };

  const deleteContact = id => {
    setContacts(() => contacts.filter(cont => cont.id !== id));
  };

  const { wrapper } = styles;
  return (
    <div className={wrapper}>
      <h1 style={{ textAlign: 'center' }}>
        React homework 4 - hooks phonebook
      </h1>
      <Section title="Phonebook">
        <PhoneBook newContact={addNewContact} />
      </Section>

      <Section title="Contacts">
        <SearchFilter searchByName={searchByName} />
        <ContactsList contacts={viewContacts()} deleteItem={deleteContact} />
      </Section>
    </div>
  );
};
