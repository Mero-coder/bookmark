var bookmarkNameInput=  document.getElementById('bookmarkName');
var bookmarkUrlInput=  document.getElementById('bookmarkUrl');
var button = document.querySelector('.submit');
var layer = document.querySelector('.layer');
var cancle= document.querySelector(' .cancle' )
var bookList =[];




if(localStorage.getItem('bookList') != null){
    bookList = JSON.parse( localStorage.getItem('bookList'))
    displayData();
   
}

function submit(){
    const bookNameValid = validateName();
    const siteNameValid = validateUrl();

    if (!bookNameValid || !siteNameValid) {
        layer.classList.replace("d-none", "d-flex");
    } else {
    var book = {
    name: bookmarkNameInput.value,
    url: bookmarkUrlInput.value
 };
 
 clearForm();
   
 
   bookList.push(book)
   localStorage.setItem('bookList' , JSON.stringify(bookList))
 
   displayLastIndex();

   
}
}

function clearForm(){
    bookmarkNameInput.value=null;
    bookmarkUrlInput.value=null;
}



function displayLastIndex(){
   
      var   container = 
       ` <tr>
            <td>${bookList.length}</td>
            <td>${bookList[bookList.length-1].name}</td>
            <td><a href="${bookList[bookList.length - 1].url}" target="_blank">
            <button type="button" class="btn btn-success">visit</button></td>
            </a>
            <td><button onclick="deleteBook(${bookList.length - 1})" type="button" class="btn btn-danger">Delete</button></td>

        </tr>`
   

    document.getElementById('t-body').innerHTML+= container;

}


function displayData(){
    var   container = '';
    for(var i=0 ; i<bookList.length; i++ ){
         container += 
           `<tr>
            <td>${i+1}</td>
            <td>${bookList[i].name}</td>
            <td><a href="${bookList[i].url}"<button type="button" class="btn btn-success">visit</button></td>
            <td><button onclick="deleteBook(${i})" type="button" class="btn btn-danger">Delete</button></td>

            </tr>`
    }

    document.getElementById('t-body').innerHTML = container;
 
}


function deleteBook(index){
     bookList.splice(index,1);
 
     localStorage.setItem('bookList', JSON.stringify(bookList) )
     displayData(bookList)
}






function validateName() {
    var regex = /^[^\s!@#$%^&*()+=\[\]{};':"\\|,.<>/?~`-].{2,}$/;
    if (regex.test(bookmarkNameInput.value)){
     bookmarkNameInput.classList.add("is-valid")
     bookmarkNameInput.classList.remove("is-invalid")
     return true;
    }
    else{
        bookmarkNameInput.classList.add("is-invalid")
        bookmarkNameInput.classList.remove("is-valid")
        return false;
    }

}


function validateUrl(){
    var regex = /^(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    if(regex.test(bookmarkUrlInput.value)){
        bookmarkUrlInput.classList
        bookmarkUrlInput.classList.add("is-valid");
        bookmarkUrlInput.classList.remove("is-invalid");
        return true;
    } else {
        bookmarkUrlInput.classList.add("is-invalid");
        bookmarkUrlInput.classList.remove("is-valid");
        return false;
    }


}


cancle.addEventListener('click',function() {
    layer.classList.replace("d-flex", "d-none");
});


button.addEventListener('click', function () {
    submit();
});


bookmarkNameInput.addEventListener('keyup', function () {
   validateName();
});


bookmarkUrlInput.addEventListener('keyup', function () {
    validateUrl();
});