export const updatePagination = (
  total,
  currentPage,
  itemsPerPage,
  onPageChange
) => {
  const container = document.querySelector("#pagination-container");
  container.innerHTML = "";

  const totalPages = Math.ceil(total / itemsPerPage);
  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    if (i === currentPage) button.classList.add("active");
    button.addEventListener("click", () => onPageChange(i));
    container.appendChild(button);
  }
};
