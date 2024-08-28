import logo from './logo.svg';
import './components/App.css';
import { useState } from 'react';

import { db, storage } from './Firebase/firebasecofig';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function App() {

  const [foodname, setFoodname] = useState('')
  const [fooddescription, setFoodDescription] = useState('')
  const [foodcategory, setFoodcategory] = useState('')
  const [foodprice, setFoodprice] = useState('')
  const [foodImage, setFoodImage] = useState(null)
  const [restaurantname, setRestaurantname] = useState('')
  const [restaurantphone, setRestaurantphone] = useState('')
  const [restaurantaddress, setRestaurantaddress] = useState('')
  const [foodImageUrl, setFoodImageUrl] = useState('')


  const handleChange = (e) => {
    e.preventDefault();

    if (foodImage == null) {
      alert("Pls Select The Image File")
      return
    }
    else {
      const imageRef = ref(storage, `FoodImages/${foodImage.name}`)
      uploadBytes(imageRef, foodImage)
        .then(() => {
          alert('Image uploaded Sucessfully')
          getDownloadURL(imageRef)
            .then((url) => {
              setFoodImageUrl(url)

              const foodData = {
                foodname,
                foodcategory,
                fooddescription,
                foodImageUrl: url,
                foodprice,
                restaurantaddress,
                restaurantname,
                restaurantphone
              }

              console.log(foodData)

              try {
                const docref = addDoc(collection(db , "FoodData"), foodData);
                alert("Data added Sucessfully", docref.id);
              } 
              catch (error) {
                alert("Error To Add Document" , error);
              }

            })
        })
        .catch((error) => {
          alert(error.message)
        })
    }


  }

  return (
    <div className="form-outer">
      <h1>Dilzito DashBoard</h1>

      <form className='form-inner'>

        <label>Food Name

          <input type='text' name='food_name'
            onChange={(e) => { setFoodname(e.target.value) }} />
        </label>
        <br />

        <label>Food Description</label>
        <input type='text' name='food_description'
          onChange={(e) => { setFoodDescription(e.target.value) }} />
        <br />

        <label>Food Category</label>
        <input type='text' name='food_category'
          onChange={(e) => { setFoodcategory(e.target.value) }} />
        <br />

        <label>Food Price</label>
        <input type='number' name='food_price'
          onChange={(e) => { setFoodprice(e.target.value) }} />
        <br />

        <label>Food Image</label>
        <input type='file' name='food_image'
          onChange={(e) => { setFoodImage(e.target.files[0]) }} />
        <br />

        <label>Restaurant Name</label>
        <input type='text' name='restaurant_name'
          onChange={(e) => { setRestaurantname(e.target.value) }} />
        <br />

        <label>Restaurant Address</label>
        <input type='text' name='restaurant_address'
          onChange={(e) => { setRestaurantaddress(e.target.value) }} />
        <br />

        <label>Restaurant Phone</label>
        <input type='number' name='restaurant_phone'
          onChange={(e) => { setRestaurantphone(e.target.value) }} />
        <br />

        <button onClick={handleChange}>Add Food</button>

      </form>
    </div>
  );
}

export default App;
