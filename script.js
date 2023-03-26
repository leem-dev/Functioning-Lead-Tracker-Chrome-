"use strict";

const inputText = document.querySelector(".input-text")
const saveButton = document.querySelector(".save-button")
const ulText = document.querySelector(".ul-text")
const deleteButton = document.querySelector(".delete-button")
const tabButton = document.querySelector(".tab-button")
const saveMyGatheredList = JSON.parse( localStorage.getItem("arrangedLeads") )

let arrangedLeads = []

if (saveMyGatheredList) {

  arrangedLeads = saveMyGatheredList
    getArranged(arrangedLeads)

}


deleteButton.addEventListener("dblclick", function()  {

  localStorage.clear()
    arrangedLeads = []
      getArranged(arrangedLeads)

})

tabButton.addEventListener("click", function(){

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    arrangedLeads.push(tabs[0].url)
      localStorage.setItem("arragedLeads", JSON.stringify(arrangedLeads) )
        getArranged(arrangedLeads)
  })

})


saveButton.addEventListener("click", function() {

  arrangedLeads.push(inputText.value)
    inputText.value = " "
      localStorage.setItem("arrangedLeads", JSON.stringify(arrangedLeads) )
        getArranged(arrangedLeads)

})


function getArranged(leads) {

  let myArrangedLeads = ""

  for (let i = 0; i < leads.length; i++)  {

    myArrangedLeads += 
      `
        <li>
          <a target='_blank' href='${leads[i]}'>

            ${leads[i]}

          </a>
        </li>
      `

  }

  ulText.innerHTML = myArrangedLeads
}