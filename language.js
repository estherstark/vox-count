let langs = [
  [
    "English",
    ["en-AU", "Australia"],
    ["en-CA", "Canada"],
    ["en-IN", "India"],
    ["en-NZ", "New Zealand"],
    ["en-ZA", "South Africa"],
    ["en-GB", "United Kingdom"],
    ["en-US", "United States"],
  ],
  ["Thai", ["th-TH", "ไทย"]],
];
let select_language = document.querySelector("#select_language");
let select_dialect = document.querySelector("#select_dialect");

for (let i = 0; i < langs.length; i++) {
  select_language.options[i] = new Option(langs[i][0], i);
}

select_language.selectedIndex = 1;
updateCountry();
select_dialect.selectedIndex = 0;

function updateCountry() {
  for (let i = select_dialect.options.length - 1; i >= 0; i--) {
    select_dialect.remove(i);
  }
  let list = langs[select_language.selectedIndex];
  // Check if list exists and has items
  if (!list || !Array.isArray(list)) {
    list = []; // Initialize as empty array if undefined
    console.warn("List was undefined, initialized as empty array");
    return; // Exit the function if no valid list
  }
  for (let i = 1; i < list.length; i++) {
    select_dialect.options.add(new Option(list[i][1], list[i][0]));
  }
  select_dialect.style.visibility = list[1].length == 1 ? "hidden" : "visible";
}
