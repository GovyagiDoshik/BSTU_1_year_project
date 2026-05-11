function loadProfessions() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../Data/professions.xml', true);
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            const xmlText = xhr.responseText;  
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');  
            const professions = xmlDoc.getElementsByTagName('profession');
            displayProfessions(professions);
        }
    };
    
    xhr.send();
}

function displayProfessions(professions) {
    const container = document.getElementById('professionsList');
    container.innerHTML = '';

    for (let i = 0; i < professions.length; i++) {
        const profession = professions[i];

        const title = profession.getElementsByTagName('title')[0]?.textContent || "Без названия";
        const description = profession.getElementsByTagName('description')[0].textContent || "";
        let link = "#";
        let elemLink = null;
        let imagePath = "";
        let img = null;

        const card = document.createElement('div');
        card.className = 'professionCard';
        
        const infoDiv = document.createElement('div');
        infoDiv.className = 'info'; 
        const titleElem = document.createElement('h2');
        titleElem.textContent = title;
        const descElem = document.createElement('p');
        descElem.textContent = description;

        if (profession.getElementsByTagName('link').length > 0) {
            link = profession.getElementsByTagName('link')[0].textContent;
            elemLink = document.createElement('a');
            elemLink.textContent = "Подробнее";
            elemLink.href = link;
            elemLink.className = 'detailLink';
        }
        if (profession.getElementsByTagName('image').length > 0) 
        {
            imagePath = profession.getElementsByTagName('image')[0].textContent;
            img = document.createElement('img');
            img.src = imagePath;
            img.alt = title;
            img.className = "cardImage"
        }

        infoDiv.appendChild(titleElem);
        infoDiv.appendChild(descElem);
        if(elemLink)
        {
            infoDiv.appendChild(elemLink);
        }
        if(img)
        {
            card.appendChild(img);
        }
        card.appendChild(infoDiv);
        
        container.appendChild(card);
    }
}

loadProfessions();