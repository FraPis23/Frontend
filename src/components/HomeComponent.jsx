import React from 'react';
import {useState, useEffect} from 'react';
import '../rendering/HomeComponent.css'

function Home() {
    const [user, setUsers] = useState([{id: '', name: '', lastName: ''}]);

    useEffect(() => {
        const userId = "66aa4c76aa2270d98c9719b7"; // DA FARE BENE
        fetch(`http://localhost:5555/api/users/${userId}`)
            .then(response => response.json())
            .then(data => {
                setUsers({id: data._id, name: data.name, lastName: data.lastName});
            })
            .catch(error => console.error("Errore nel recuper dei dati: ", error));
    }, []);
    return (
        <div>
            <main className='homeContainer'>
                <aside>
                    <span>Benvenuto, {user.name} {user.lastName}</span> <br />
                    <span>{user.id}</span>
                </aside>
                <section>

                </section>
            </main>

        </div>
    );
}

export default Home;