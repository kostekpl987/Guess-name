let link="https://api.nationalize.io/?name=";
const cname = new Intl.DisplayNames(['EN'], { type: 'region' });
const form=document.querySelector("form")



function rounding(percent) {
    return Math.round(parseFloat(percent)*1000)/10;
}
function prevent() {
    event.preventDefault();
}


function getStats() {
    let x=document.querySelector("input").value;
    let result=document.querySelector(".results")

    document.querySelector('.e_container').style.display='none';
    document.querySelector("input").value=""
    result.innerHTML="";
    
    
    
    fetch(link+x)

    .then(res => {
        return res.json();
    })

    .then(res => {
        if(res.country.length!=0){
            result.style.opacity=1;
            let h1=document.createElement('h1');
            h1.innerHTML=x
            result.appendChild(h1)
            for(const country of res.country){
                let out = document.createElement('div');
                result.appendChild(out)

                let p = document.createElement('p');
                p.innerHTML=`${cname.of(country.country_id)} ${rounding(country.probability)}%`
                out.appendChild(p);

                let ins = document.createElement('div');
                ins.style.width=`${rounding(country.probability)}%`;
                out.appendChild(ins)
            }
        }
        else{
            result.style.opacity=0;
            document.querySelector('.e_container').style.display='block';
        }
    })
}






form.addEventListener("submit",getStats)
form.addEventListener("submit",prevent)
getStats()