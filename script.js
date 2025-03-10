document.getElementById('submit-btn').addEventListener('click', fetchCountryInfo);

async function fetchCountryInfo(event) {
    event.preventDefault(); 
    const countryName = document.getElementById('country-input').value.trim();

    try {
      
        const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fields=name,capital,region,flags,population,borders`);
        
        if (!response.ok) {
            throw new Error('Country not found');
        }

        const data = await response.json();
        const country = data[0];

     
        const countryInfo = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="100">
        `;
        
        
        document.getElementById('country-info').innerHTML = countryInfo;

      
        let borderingCountriesHTML = '';
        if (country.borders && country.borders.length > 0) {
            borderingCountriesHTML = '<h3>Bordering Countries:</h3>';
            for (const border of country.borders) {
                const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha/${border}?fields=name,flags`);
                const borderData = await borderResponse.json();
                const borderingCountry = borderData[0];

                borderingCountriesHTML += `
                    <div class="border-country">
                        <img src="${borderingCountry.flags.png}" alt="Flag of ${borderingCountry.name.common}" width="50">
                        <p>${borderingCountry.name.common}</p>
                    </div>
                `;
            }
        } else {
            borderingCountriesHTML = '<p>No bordering countries</p>';
        }

        
        document.getElementById('bordering-countries').innerHTML = borderingCountriesHTML;
        
    } catch (error) {
       
        document.getElementById('country-info').innerHTML = `<p>${error.message}</p>`;
        document.getElementById('bordering-countries').innerHTML = '';
    }
}
