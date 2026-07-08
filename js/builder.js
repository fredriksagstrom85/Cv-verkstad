document.addEventListener("DOMContentLoaded",()=>{

const fields=[
["name","previewName"],
["title","previewTitle"],
["email","previewEmail"],
["phone","previewPhone"],
["address","previewAddress"],
["about","previewAbout"]
];

fields.forEach(field=>{

const input=document.getElementById(field[0]);
const preview=document.getElementById(field[1]);

if(!input || !preview) return;

preview.textContent=input.value;

input.addEventListener("input",()=>{

preview.textContent=input.value;

});

});

const photo=document.getElementById("photo");
const preview=document.getElementById("previewPhoto");

photo?.addEventListener("change",e=>{

const file=e.target.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=x=>{

preview.src=x.target.result;
preview.style.display="block";

}

reader.readAsDataURL(file);

});

});
