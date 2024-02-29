
const loadPhone = async (searchText='13' , isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones , isShowAll)
}

const displayPhone = (phones , isShowAll) => {
 
const phoneContainer=document.getElementById('phone-container')
  phoneContainer.textContent = '';
  
  const showAllContainer = document.getElementById('show-all-container');
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove('hidden')
  } else {
    showAllContainer.classList.add('hidden')
  }

console.log(isShowAll)

// display only 12 phone
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

    phones.forEach(phone => {

        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-white-600 p-4 shadow-xl`;
        phoneCard.innerHTML=`<figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name
            }</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick='handelShowDetail("${phone.slug}");' class="btn btn-primary">Show Details</button>
          </div>
        </div>`


phoneContainer.appendChild(phoneCard)
    })
  
  // hide lpoading spiner
  toggolLoadingSpiner(false);
  
}

// modal show
const handelShowDetail = async(id) => {
  // console.log(id)
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  
  const phone = data.data;


  showPhoneDetails(phone)
}


const showPhoneDetails = (phone) => {
  console.log(phone)

  const phoneName = document.getElementById("show-details-phone-name")
  phoneName.innerText = phone.name;

const showDetsilContainer=document.getElementById('show-detail-container')
  showDetsilContainer.innerHTML = `
  <img src="${phone.image}" alt=""/>
  <p><span>Storage:</span>${phone?.mainFeatures?.
    storage}</p>

`



  show_detail_modal.showModal()
}


const handelSearch = (isShowAll) => {
  toggolLoadingSpiner(true)
  const searchFild = document.getElementById('search-fila');
  const searchText = searchFild.value;

  loadPhone(searchText , isShowAll);

}

const toggolLoadingSpiner = (isLoading) => {
const toggolLoadingSpiner = document.getElementById('loading-spiner');

  if (isLoading) {
    toggolLoadingSpiner.classList.remove('hidden')
  } else {
    toggolLoadingSpiner.classList.add('hidden')
  }
 
}

// handell show all
const handelShowAll = () => {
  handelSearch(true);

   
 }

loadPhone()