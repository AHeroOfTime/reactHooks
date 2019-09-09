import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useMemo,
} from 'react';
import Toggle from './Toggle';
import Counter from './Counter';
import { useTitleInput } from './hooks/useTitleInput';

export const UserContext = createContext();

const App = () => {
  // const [value, setValue] = useState(initialState);
  const [name, setName] = useTitleInput('');
  const ref = useRef();
  const [dishes, setDishes] = useState([]);

  const fetchDishes = async () => {
    const res = await fetch(
      'https://my-json-server.typicode.com/leveluptuts/fakeapi/dishes',
    );
    const data = await res.json();
    setDishes(data);
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  // const reverseWord = word => {
  //   console.log('function called');
  //   return word
  //     .split('')
  //     .reverse()
  //     .join('');
  // };
  // const title = 'Level Up Dishes';

  // const TitleReversed = useMemo(() => reverseWord(name), [name]);

  return (
    <UserContext.Provider
      value={{
        user: true,
      }}
    >
      <div className="main-wrapper" ref={ref}>
        <h1 onClick={() => ref.current.classList.add('new-fake-class')}>
          {/* {TitleReversed} */}
          Level Up Dishes
        </h1>
        <Toggle />
        <Counter />
        <form
          onSubmit={e => {
            e.preventDefault();
            // formSubmit(name, setName);
          }}
        >
          <input
            type="text"
            onChange={e => setName(e.target.value)}
            value={name}
          />
          <button>Submit</button>
        </form>
        {dishes.map(dish => (
          <article className="dish-card dish-card--withImage">
            <h3>{dish.name}</h3>
            <p>{dish.desc}</p>
            <div className="ingredients">
              {dish.ingredients.map(ingredient => (
                <span>{ingredient}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </UserContext.Provider>
  );
};

// const formSubmit = (value, setValue) => {
//   console.log('email sent to' + value + '!');
//   setValue('');
// };

export default App;
