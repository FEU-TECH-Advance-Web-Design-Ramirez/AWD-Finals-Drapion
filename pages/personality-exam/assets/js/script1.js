document.addEventListener("DOMContentLoaded", function () {
    const scaleContainers = document.querySelectorAll(".scale-container");

    scaleContainers.forEach((container) => {
        const circles = container.querySelectorAll(".circle");

        circles.forEach((circle, index) => {
            circle.addEventListener("click", function () {
                // Remove the 'selected' class from all circles in the same container
                circles.forEach(c => c.classList.remove("selected"));

                // Add the 'selected' class to the clicked circle
                circle.classList.add("selected");

                // Store the selected value (you can use this for form submission or local storage)
                container.dataset.selectedValue = index + 1;
            });
        });
    });
});
