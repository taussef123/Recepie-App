
const inputElem = document.querySelector(".searchBox")

const btnElem = document.querySelector(".btn")

const recepieContainerElem = document.querySelector(".recepie-container");

const recepieDetailsContent=document.querySelector(".recepie-details-content");

const recepieCloseBtn=document.querySelector(".recepie-close-btn")

// we r using here addevent listener in button bcz we want to searrch whatever we type in the input box should be searched


// Function to get recepies

const fetchRecepies = async(query)=>{ // query = searchInput jo input me food dalega woh  query h


    recepieContainerElem.innerHTML="<h2>Recepies are Loading....</h2>"
   
    try {
         const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const response = await data.json()
    console.log(response.meals[0]); //we shall get all the meals in console
 
    recepieContainerElem.innerHTML="";
    response.meals.forEach((meal)=>{
      
       const recepieDiv = document.createElement("div") // sabse pehle div banaya
       recepieDiv.classList.add("recepie"); // class add kiya recepie
       recepieDiv.innerHTML=`   
       <img src="${meal.strMealThumb}">
       <h3>${meal.strMeal}</h3>
       <p><span>${meal.strArea}</span> Dish</p>
       <p> Belongs to <span>${meal.strCategory} Category</span></p>
       `
       const button=document.createElement('button')
       button.textContent="View Recepie"
       recepieDiv.appendChild(button)

       // Adding event listener to recepie button

       button.addEventListener("click",(e)=>{
        e.preventDefault()
        viewRecepie(meal);
        console.log(meal);
        
     })
     
      // function to fetch ingredients
      const fetchIngredients=(meal)=>{
        let ingredientsList="";
        console.log(meal);
        

        for(i=1;i<=20;i++){
            let ingredient=meal[`strIngredient${i}`];
            if(ingredient){
                const measure =meal[`strMeasure${i}`];
                ingredientsList += `<li>
                ${measure} ${ingredient}
                </li>`
            }else{
                break;
            }
        }
        return ingredientsList;

      }

       const viewRecepie=(meal)=>{
        recepieDetailsContent.innerHTML=`
        <h2 class="recepieName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
          <div class="recepieInstructions">
            <h3>Instructions</h3>
            <p >${meal.strInstructions}</p>
        </div>
        `
      
        recepieDetailsContent.parentElement.style.display="block"; // parent div mtlb yeh recepie-details-content jis div k andar h ur yeh recepie details k andar h to woh uska parent hua shruru me yeh nhi dikhega bcz css hmne display none rakha h ish button k click par display block hoga ur yeh dikhega


       }

     

       recepieContainerElem.appendChild(recepieDiv); // class add krne k baad 

    })
     } catch (error) {
         recepieContainerElem.innerHTML="<h2>Plz search a valid Recepie... </h2>"
    }

}


recepieCloseBtn.addEventListener("click",()=>{
   recepieDetailsContent.parentElement.style.display="none" 
})
btnElem.addEventListener("click",(e)=>{
    e.preventDefault()
    const searchInput=inputElem.value.trim(); // jo extra chiz h usko trim krne k liye mtlb string k agey peeche extra space remove krne k liye jaise " Biryani   " => trim()=> will make "Briyani"
    //console.log("btn clicked");
    if(!searchInput){
       recepieContainerElem.innerHTML=`<h2>Type the meal in the search box.</h2>` 
       return;
    }
    fetchRecepies(searchInput)
    

})