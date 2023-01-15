import { useEffect, useState } from "react";
import api from "../api/api";

import Input from "../components/SearchBar/Input";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import "./App.css";

function useDebounceValue(value, time = 300) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, time]);

  return debounceValue;
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cards, setCards] = useState([]);
  const debounceQuery = useDebounceValue(searchQuery);

  const search = (term) => {
    api.search(debounceQuery).then((data) => {
      setCards(
        data.results.map((item) => {
          return {
            id: item.id,
            title: item.description,
            subtitle: item.user.name,
            url: item.urls.regular,
            alt: item.alt_description,
          };
        })
      );
    });
  };

  useEffect(() => {
    if (debounceQuery.length > 0) {
      search(debounceQuery);
    }
  }, [debounceQuery]);

  return (
    <div className="App">
      <div className="App__content">
        <div className="App__search">
          <h1 className="App__title">Search Your Favorite Photo</h1>
          <Input
            placeholder="Search free high-resolution photos"
            onChange={(evt) => setSearchQuery(evt.target.value)}
          />
          <Button
            title="Search"
            onClick={() => {
              search(debounceQuery);
            }}
          />
        </div>
        <div className="App__cards">
          {cards.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              subtitle={card.subtitle}
              url={card.url}
              alt={card.alt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
