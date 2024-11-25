import { fetchCities } from "./api/api.js";
import { updatePagination } from "./components/pagination.js";
import { updateTable } from "./components/table.js";

let currentPage = 1;
let currentQuery = "";
let itemsPerPage = 5;

const performSearch = async () => {
  const tbody = document.querySelector("#results-table tbody");
  const paginationContainer = document.querySelector("#pagination-container");

  // Clear results immediately when the query is cleared
  if (!currentQuery.trim()) {
    tbody.innerHTML = `<tr><td colspan="3" class="info">Start searching</td></tr>`;
    paginationContainer.innerHTML = ""; // Clear pagination
    return;
  }

  try {
    const data = await fetchCities(currentQuery, currentPage, itemsPerPage);
    if (data) {
      updateTable(data.data);
      updatePagination(
        data.metadata.totalCount,
        currentPage,
        itemsPerPage,
        handlePageChange
      );
    } else {
      tbody.innerHTML = `<tr><td colspan="3" class="info">No result found</td></tr>`;
      paginationContainer.innerHTML = "";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    tbody.innerHTML = `<tr><td colspan="3" class="info">Error fetching data</td></tr>`;
    paginationContainer.innerHTML = "";
  }
};


const handlePageChange = (page) => {
  currentPage = page;
  performSearch();
};

const init = () => {
  const searchBox = document.querySelector("#search-box");
    const limitInput = document.querySelector("#data-limit");
    
    searchBox.addEventListener("input", (e) => {
      currentQuery = e.target.value.trim();

      if (!currentQuery) {
        const tbody = document.querySelector("#results-table tbody");
        const paginationContainer = document.querySelector(
          "#pagination-container"
        );
        tbody.innerHTML = `<tr><td colspan="3" class="info">Start searching</td></tr>`;
        paginationContainer.innerHTML = "";
      }
    });

  searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && currentQuery) {
      currentPage = 1; 
      performSearch();
    }
  });

  limitInput.addEventListener("change", (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 10) {
      alert("Maximum limit is 10");
      e.target.value = 10;
    }
    itemsPerPage = Math.min(Math.max(value, 1), 10);
    currentPage = 1;
    performSearch();
  });

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "/") {
      e.preventDefault();
      searchBox.focus();
    }
  });

  const tbody = document.querySelector("#results-table tbody");
  tbody.innerHTML = `<tr><td colspan="3" class="info">Start searching</td></tr>`;
  const paginationContainer = document.querySelector("#pagination-container");
  paginationContainer.innerHTML = "";
};

document.addEventListener("DOMContentLoaded", init);
