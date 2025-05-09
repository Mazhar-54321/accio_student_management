let jsonData=[]
document.addEventListener('DOMContentLoaded', async () => {
    let tbody = document.getElementById('jsonTable').querySelector('tbody');
    //tbody=""
    tbody.innerHTML=''
    try {
        // Fetch JSON data
        const response = await fetch('./sample.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const Sample = await response.json();
        
        console.log('Fetched JSON:', Sample);
        const data = Array.isArray(Sample) ? Sample : [];
         jsonData=data;
        if (data.length === 0) {
            console.error('No valid data in sample.json');
            alert('No data to display.');
            return;
        }

       addRows(data)
    } catch (error) {
        console.error('Error loading sample.json:', error);
        alert('Failed to load sample.json. Please check the file.');
    }
});
function search(){
const text =document.getElementById("search").value.trim().toLowerCase();
addRows(jsonData.filter((el)=>`${el.first_name} ${el.last_name}`.toLowerCase().includes(text)))
}
function clickHandler(){
const text =document.getElementById("search").value;
}
function filter(filterName){
    let tempData = structuredClone(jsonData);
    switch(filterName){
        case "a-z":addRows(tempData.sort((a,b)=>`${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`))); break;
        case "z-a":addRows(tempData.sort((b,a)=>`${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`)));break;
        case "gender":addRows(tempData.sort((a,b)=>a.gender.localeCompare(b.gender))); break;
        case "class":addRows(tempData.sort((a,b)=>a.class-b.class));break;
        case "pass":addRows(tempData.sort((a,b)=>String(a.passing).localeCompare(String(b.passing))));break;
        case "marks":addRows(tempData.sort((a,b)=>a.marks-b.marks));break;
    }

}
function addRows(data){
    console.log(data,"hhhh")
    let tbody = document.getElementById('jsonTable').querySelector('tbody');
    //tbody=""
    tbody.innerHTML=''
    data.forEach(item => {
        const row = document.createElement('tr');
//{"id":1,"first_name":"Chadwick","last_name":"Ayre","email":"cayre0@cam.ac.uk","gender":"Male","img_src":"https://robohash.org/corporisquiaperiam.png?size=50x50&set=set1","class":11,"marks":18,"passing":false,"city":"Moorreesburg"},
      let array = [item["id"],`${item["first_name"]} ${item["last_name"]}`,item["gender"],item["class"],item["marks"],item["passing"]?"passing":"failed",item["email"]]
        // Create cells for 5 fields
        const fields = ['id', 'first_name', 'last_name', 'email', 'gender'];
        array.forEach((field,index) => {
            const cell = document.createElement('td');
            cell.textContent = field;
            if(index === 1){
                const image = document.createElement('img');
                image.src=item['img_src'];
                const div = document.createElement('div');
                cell.innerHTML=`<img src=${item['img_src']} /><span>${field}</span>`
                
                // div.appendChild(image);
                // div.appendChild(cell);
                row.appendChild(cell);

            }else{
                row.appendChild(cell);
            }
            
        });

       tbody.appendChild(row);
    });
}