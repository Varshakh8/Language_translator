
async function translateText(){

const text = document.getElementById("inputText").value;
const source = document.getElementById("sourceLang").value;
const target = document.getElementById("targetLang").value;

document.getElementById("outputText").value = "Translating...";

try {

const response = await fetch("/translate",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({text,source,target})
});

const data = await response.json();

console.log("API Response:", data); // 👈 IMPORTANT

document.getElementById("outputText").value = data.translation || "No translation found";

} catch (error) {
console.log(error);
document.getElementById("outputText").value = "Error occurred";
}

}