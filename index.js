let globalTaskData=[];
const taskContents = document.getElementById("taskContentsrow");

// OBJECT creation 

const addCard=()=>
{
    const newTaskDetails={
        id:`${Date.now()}`,
        url:document.getElementById("imgurl").value ,
        title:document.getElementById("taskTitle").value,
        heading:document.getElementById("taskHeading").value,
        description:document.getElementById("taskDescription").value,

    };

    taskContents.insertAdjacentHTML(
        "beforeend",
       displaycard(newTaskDetails)
      );
    
    //   console.log(newTaskDetails.url);

    globalTaskData.push(newTaskDetails);
    savedata();
      
}


const displaycard=({id,url,title,heading,description})=>
 `<div class=" col-md-6 col-lg-4 mt-3 ">

    <div class="card" id=${id} >
        <div class="card-header">
            <div class="d-flex justify-content-end">
                <button type="button" name=${id} class="btn btn-outline-info" onclick="editTask(this)">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button type="button" class="btn btn-outline-danger  " name=${id} onclick="deleteTask(this)">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
            <h5 class="card-title" id="th${id}">${heading}</h5>
        </div>
        <img src=${url}
            class="card-img-top">
        <div class="card-body">
            <h5 class="card-title" id="tt${id}">${title}</h5>
            <p class="card-text" id="td${id}">${description}</p>
        </div>
        <div class="card-footer">
            <button type="button" name=${id} class="btn btn-outline-primary">
                Open Task
            </button>
        </div>
    </div>
</div>`;


const savedata=()=>
{
    localStorage.setItem("tasky",JSON.stringify({tasks :globalTaskData}));
}

const displaysaveddata=()=>
{
   const items= JSON.parse(localStorage.getItem("tasky"));
   if(items)
   {
       globalTaskData=items["tasks"];
   }


   globalTaskData.map((cardData) => {
    taskContents.insertAdjacentHTML("beforeend", displaycard(cardData));
    });
}

const deleteTask=(e)=>
{
    const id= e.getAttribute("name");

    const temparr=globalTaskData.filter((card)=>{ return card.id!==id});

    globalTaskData=temparr;
    savedata();
    window.location.reload();
}


const editTask=(e)=>
{
    // console.log("shi h ");
    // card-header
    let id= e.getAttribute("name");
    console.log(id);
    // console.log(e.parentNode.parentNode.parentNode.childNodes[3]);
    // // heading
    // console.log(e.parentNode.parentNode.parentNode.childNodes[1].childNodes[3]);
    
    // // card-body
    // console.log(e.parentNode.parentNode.parentNode.childNodes[5]);
    
    // // title
    // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1]);

    // // description
    // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3]);
    
    e.parentNode.parentNode.parentNode.childNodes[1].childNodes[3].setAttribute("contenteditable", "true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "true")


    e.parentNode.parentNode.parentNode.childNodes[1].childNodes[3].style.setProperty("border", "1px solid #727297")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].style.setProperty("border", "1px solid #727297")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].style.setProperty("border", "1px solid #727297")


    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "SAVE CHANGES"
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick", "saveEditTask(this)")
    
}

const saveEditTask=(e)=>
{   
    
    let id= e.getAttribute("name");
    // console.log(id);
    const temparr=globalTaskData.filter((card)=>{
        
        console.log(card.id)
        if(card.id===id)
        {   
            console.log(card);
            card.title=document.getElementById("tt"+id).textContent
            card.heading=document.getElementById("th"+id).textContent
            card.description=document.getElementById("td"+id).textContent
            console.log(card);
            

            
        }
        
            return card;
        

    } );
    globalTaskData=temparr;
    
    savedata();
    window.location.reload();
}
