// Sample blog entries data
let blogEntries = [
  {
    id: 1,
    title: "Morning Reflections",
    date: "2024-07-06",
    mood: "🧘 Peaceful",
    content:
      "The morning light filtered through my window, casting gentle shadows across my journal. There's something magical about these quiet moments before the world wakes up. I find myself thinking about gratitude and the small things that bring joy to my day.",
    preview:
      "The morning light filtered through my window, casting gentle shadows across my journal. There's something magical about these quiet moments...",
  },
  {
    id: 2,
    title: "Creative Breakthrough",
    date: "2024-07-05",
    mood: "✨ Inspired",
    content:
      "Today I had an incredible breakthrough with my art project. Sometimes the best ideas come when we least expect them. The colors seemed to flow effortlessly, and I felt completely in the zone. It's moments like these that remind me why I love creating.",
    preview:
      "Today I had an incredible breakthrough with my art project. Sometimes the best ideas come when we least expect them...",
  },
  {
    id: 3,
    title: "Rainy Day Thoughts",
    date: "2024-07-04",
    mood: "💭 Thoughtful",
    content:
      "The rain has been falling steadily all day, creating a perfect backdrop for introspection. I've been thinking about change and growth, how we evolve through different seasons of life. Sometimes the storms bring the most beautiful flowers.",
    preview:
      "The rain has been falling steadily all day, creating a perfect backdrop for introspection. I've been thinking about change and growth...",
  },
  {
    id: 4,
    title: "Weekend Adventures",
    date: "2024-07-03",
    mood: "😊 Happy",
    content:
      "What a wonderful weekend! Spent time with friends exploring the local farmers market, trying new foods, and laughing until our sides hurt. These are the moments that make life rich and meaningful. Grateful for the connections we share.",
    preview:
      "What a wonderful weekend! Spent time with friends exploring the local farmers market, trying new foods, and laughing until our sides hurt...",
  },
];

let editingId = null;

function renderBlogEntries(entries = blogEntries) {
  const blogGrid = document.getElementById("blogGrid");
  blogGrid.innerHTML = "";

  entries.forEach((entry) => {
    const blogCard = document.createElement("div");
    blogCard.className = "blog-card fade-in";
    blogCard.innerHTML = `
            <h3>${entry.title}</h3>
            <div class="blog-meta">
                <span>${new Date(entry.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</span>
                <span class="mood-tag">${entry.mood}</span>
            </div>
            <p class="blog-preview">${entry.preview}</p>
            <div class="blog-actions">
                <button class="btn btn-read" onclick="readEntry(${
                  entry.id
                })">📖 Read</button>
                <button class="btn btn-edit" onclick="editEntry(${
                  entry.id
                })">✏️ Edit</button>
                <button class="btn btn-delete" onclick="deleteEntry(${
                  entry.id
                })">❌ Delete</button>
            </div>
        `;
    blogGrid.appendChild(blogCard);
  });
}

function openModal(entry = null) {
  const modal = document.getElementById("entryModal");
  const modalTitle = document.getElementById("modalTitle");
  const form = document.getElementById("entryForm");

  if (entry) {
    modalTitle.textContent = "Edit Entry";
    document.getElementById("entryTitle").value = entry.title;
    document.getElementById("entryDate").value = entry.date;
    document.getElementById("entryMood").value = entry.mood;
    document.getElementById("entryContent").value = entry.content;
    editingId = entry.id;
  } else {
    modalTitle.textContent = "Create New Entry";
    form.reset();
    document.getElementById("entryDate").value = new Date()
      .toISOString()
      .split("T")[0];
    editingId = null;
  }

  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("entryModal").style.display = "none";
  editingId = null;
}

function editEntry(id) {
  const entry = blogEntries.find((e) => e.id === id);
  if (entry) {
    openModal(entry);
  }
}

function deleteEntry(id) {
  if (
    confirm(
      "Are you sure you want to delete this entry? This action cannot be undone."
    )
  ) {
    blogEntries = blogEntries.filter((e) => e.id !== id);
    renderBlogEntries();
  }
}

function readEntry(id) {
  const entry = blogEntries.find((e) => e.id === id);
  if (entry) {
    alert(`${entry.title}\n\n${entry.content}`);
  }
}

function searchEntries(query) {
  if (!query.trim()) {
    renderBlogEntries();
    return;
  }

  const filteredEntries = blogEntries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(query.toLowerCase()) ||
      entry.content.toLowerCase().includes(query.toLowerCase()) ||
      entry.mood.toLowerCase().includes(query.toLowerCase())
  );
  renderBlogEntries(filteredEntries);
}

function showHome() {
  renderBlogEntries();
}

function showMyEntries() {
  renderBlogEntries();
}

function showAbout() {
  alert(
    "Welcome to Mindful Pages! This is your personal space for reflection, creativity, and growth. Document your thoughts, feelings, and experiences in this beautiful digital journal."
  );
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    alert("Thank you for using Mindful Pages! Your entries have been saved.");
  }
}

// Handle form submission
document.getElementById("entryForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("entryTitle").value;
  const date = document.getElementById("entryDate").value;
  const mood = document.getElementById("entryMood").value;
  const content = document.getElementById("entryContent").value;

  if (editingId) {
    // Update existing entry
    const entryIndex = blogEntries.findIndex((e) => e.id === editingId);
    if (entryIndex !== -1) {
      blogEntries[entryIndex] = {
        ...blogEntries[entryIndex],
        title,
        date,
        mood,
        content,
        preview:
          content.substring(0, 150) + (content.length > 150 ? "..." : ""),
      };
    }
  } else {
    // Add new entry
    const newEntry = {
      id: Date.now(),
      title,
      date,
      mood,
      content,
      preview: content.substring(0, 150) + (content.length > 150 ? "..." : ""),
    };
    blogEntries.unshift(newEntry);
  }

  renderBlogEntries();
  closeModal();
});

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("entryModal");
  if (event.target === modal) {
    closeModal();
  }
};

// Initial render
renderBlogEntries();
