import { getFlagUrl } from "../utils/helper.js";


export const updateTable = (data) => {
  const tbody = document.querySelector("#results-table tbody");
  tbody.innerHTML = "";

  if (!data || data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="info">No result found</td></tr>`;
    return;
  }

  data.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.city}</td>
      <td><img src="${getFlagUrl(item.countryCode)}" alt="${
      item.country
    }" width="20"> ${item.country}</td>
    `;
    tbody.appendChild(row);
  });
};
