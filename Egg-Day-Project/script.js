const recipes = [
  {
    id: 1,
    name: 'Classic Scrambled Eggs',
    image:
      'https://i.pinimg.com/1200x/a6/3a/48/a63a482ae2bd0edc1092bc8c2df13e87.jpg',
    prepTime: '5 mins',
    cookTime: '10 mins',
    difficulty: 'Easy',
    description: 'Fluffy and creamy scrambled eggs perfect for breakfast.',
    ingredients: [
      '3 large eggs',
      '2 tablespoons milk or cream',
      '1 tablespoon butter',
      'Salt and pepper to taste',
      'Fresh chives (optional)',
    ],
    instructions: [
      'Whisk eggs, milk, salt, and pepper in a bowl until well combined',
      'Melt butter in a non-stick skillet over medium heat',
      'Pour in egg mixture and let it set for 30 seconds',
      'Gently push cooked portions from edges toward the center',
      'Continue cooking until eggs are thickened but still moist',
      'Garnish with fresh chives and serve immediately',
    ],
    nutrition: {
      calories: 215,
      protein: '18g',
      carbs: '2g',
      fat: '15g',
    },
  },
  {
    id: 2,
    name: 'Perfect Hard-Boiled Eggs',
    image:
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80',
    prepTime: '2 mins',
    cookTime: '12 mins',
    difficulty: 'Easy',
    description: 'Perfectly cooked hard-boiled eggs with creamy yolks.',
    ingredients: ['6 large eggs', 'Water for boiling', 'Ice cubes'],
    instructions: [
      'Place eggs in a single layer in a saucepan',
      'Add cold water until eggs are covered by 1 inch',
      'Bring to a rolling boil over high heat',
      'Remove from heat, cover, and let stand for 10-12 minutes',
      'Transfer eggs to ice water bath for 5 minutes',
      'Peel and serve or store in refrigerator',
    ],
    nutrition: {
      calories: 78,
      protein: '6g',
      carbs: '1g',
      fat: '5g',
    },
  },
  {
    id: 3,
    name: 'Fluffy Omelette',
    image:
      'https://i.pinimg.com/736x/b7/2a/06/b72a06a984dfeadc06bbdb28bbcf1abb.jpg',
    prepTime: '10 mins',
    cookTime: '5 mins',
    difficulty: 'Medium',
    description: 'Light and airy omelette with your favorite fillings.',
    ingredients: [
      '3 large eggs',
      '2 tablespoons water',
      'Salt and pepper to taste',
      '1 tablespoon butter',
      'Fillings: cheese, ham, mushrooms, peppers',
    ],
    instructions: [
      'Whisk eggs, water, salt, and pepper until frothy',
      'Melt butter in omelette pan over medium-high heat',
      'Pour in egg mixture and let edges set',
      'Lift edges to let uncooked egg flow underneath',
      'Add fillings to one half when eggs are nearly set',
      'Fold omelette in half and slide onto plate',
    ],
    nutrition: {
      calories: 280,
      protein: '20g',
      carbs: '3g',
      fat: '21g',
    },
  },
  {
    id: 4,
    name: 'Egg Fried Rice',
    image:
      'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80',
    prepTime: '15 mins',
    cookTime: '10 mins',
    difficulty: 'Medium',
    description: 'Quick and delicious egg fried rice with vegetables.',
    ingredients: [
      '3 cups cooked rice (preferably day-old)',
      '3 large eggs, beaten',
      '2 tablespoons vegetable oil',
      '1 cup mixed vegetables (peas, carrots, corn)',
      '2 cloves garlic, minced',
      '3 tablespoons soy sauce',
      '2 green onions, chopped',
    ],
    instructions: [
      'Heat oil in a large wok or skillet over high heat',
      'Add beaten eggs and scramble until cooked, then remove',
      'Add garlic and vegetables, stir-fry for 2 minutes',
      'Add rice and break up any clumps',
      'Return eggs to pan, add soy sauce',
      'Stir-fry for 3-4 minutes until heated through',
      'Garnish with green onions and serve',
    ],
    nutrition: {
      calories: 320,
      protein: '15g',
      carbs: '45g',
      fat: '9g',
    },
  },
  {
    id: 5,
    name: 'Deviled Eggs',
    image:
      'https://i.pinimg.com/1200x/44/74/e7/4474e7b3908e4384ff62a77feb83c18d.jpg',
    prepTime: '20 mins',
    cookTime: '12 mins',
    difficulty: 'Easy',
    description: 'Classic deviled eggs with creamy filling.',
    ingredients: [
      '6 hard-boiled eggs',
      '3 tablespoons mayonnaise',
      '1 teaspoon mustard',
      '1 teaspoon vinegar',
      'Paprika for garnish',
      'Salt and pepper to taste',
    ],
    instructions: [
      'Peel hard-boiled eggs and cut in half lengthwise',
      'Remove yolks and place in a bowl',
      'Mash yolks with mayonnaise, mustard, and vinegar',
      'Season with salt and pepper',
      'Spoon or pipe mixture back into egg whites',
      'Sprinkle with paprika and chill before serving',
    ],
    nutrition: {
      calories: 125,
      protein: '7g',
      carbs: '1g',
      fat: '10g',
    },
  },
  {
    id: 6,
    name: 'Egg Salad Sandwich',
    image:
      'https://i.pinimg.com/1200x/f1/7d/1f/f17d1f307da25c26be711f26143d5c56.jpg',
    prepTime: '15 mins',
    cookTime: '12 mins',
    difficulty: 'Easy',
    description: 'Creamy egg salad perfect for sandwiches.',
    ingredients: [
      '6 hard-boiled eggs, chopped',
      '1/4 cup mayonnaise',
      '1 tablespoon mustard',
      '2 tablespoons celery, finely chopped',
      '1 tablespoon red onion, minced',
      '8 slices bread',
      'Lettuce leaves',
    ],
    instructions: [
      'Chop hard-boiled eggs and place in bowl',
      'Add mayonnaise, mustard, celery, and onion',
      'Mix gently until combined',
      'Season with salt and pepper to taste',
      'Spread egg salad on bread slices',
      'Add lettuce and make sandwiches',
    ],
    nutrition: {
      calories: 380,
      protein: '18g',
      carbs: '30g',
      fat: '21g',
    },
  },
  // NEW RECIPES START HERE
  {
    id: 7,
    name: 'Egg Drop Soup',
    image:
      'https://i.pinimg.com/1200x/18/b3/37/18b337f4a5dfc3cca8b9290867ae3d3f.jpg',
    prepTime: '5 mins',
    cookTime: '10 mins',
    difficulty: 'Easy',
    description: "Classic Chinese egg drop soup that's light and comforting.",
    ingredients: [
      '4 cups chicken broth',
      '2 large eggs, lightly beaten',
      '1 tablespoon cornstarch',
      '2 tablespoons water',
      '1 teaspoon grated ginger',
      '2 green onions, chopped',
      '1 teaspoon sesame oil',
      'Salt and white pepper to taste',
    ],
    instructions: [
      'Bring chicken broth and ginger to a boil in a pot',
      'Mix cornstarch with water to create a slurry',
      'Slowly pour cornstarch mixture into boiling broth while stirring',
      'Reduce heat to a gentle simmer',
      'Slowly drizzle beaten eggs into the soup while stirring in one direction',
      'Remove from heat and stir in sesame oil',
      'Garnish with green onions and serve immediately',
    ],
    nutrition: {
      calories: 85,
      protein: '8g',
      carbs: '4g',
      fat: '4g',
    },
  },
  {
    id: 8,
    name: 'Shakshuka',
    image:
      'https://i.pinimg.com/1200x/46/fd/c8/46fdc81b5fb28aaf1972a467c11a1495.jpg',
    prepTime: '15 mins',
    cookTime: '20 mins',
    difficulty: 'Medium',
    description: 'Middle Eastern eggs poached in spicy tomato sauce.',
    ingredients: [
      '2 tablespoons olive oil',
      '1 onion, chopped',
      '1 bell pepper, chopped',
      '3 cloves garlic, minced',
      '1 can (28oz) crushed tomatoes',
      '1 teaspoon paprika',
      '1/2 teaspoon cumin',
      '1/4 teaspoon cayenne pepper',
      '4-6 large eggs',
      'Fresh parsley for garnish',
      'Feta cheese (optional)',
    ],
    instructions: [
      'Heat olive oil in a large skillet over medium heat',
      'Sauté onion and bell pepper until softened',
      'Add garlic and spices, cook for 1 minute',
      'Pour in crushed tomatoes and simmer for 10 minutes',
      'Create wells in the sauce and crack eggs into them',
      'Cover and cook until eggs are done to your liking',
      'Garnish with parsley and feta cheese',
      'Serve with crusty bread',
    ],
    nutrition: {
      calories: 245,
      protein: '14g',
      carbs: '18g',
      fat: '14g',
    },
  },
  {
    id: 9,
    name: 'Egg Curry',
    image:
      'https://i.pinimg.com/1200x/98/8c/14/988c14d330598ec327e16424a37c36d3.jpg',
    prepTime: '10 mins',
    cookTime: '25 mins',
    difficulty: 'Medium',
    description: 'Spicy Indian egg curry in rich tomato gravy.',
    ingredients: [
      '6 hard-boiled eggs, peeled',
      '2 tablespoons oil',
      '1 onion, finely chopped',
      '2 tomatoes, pureed',
      '1 tablespoon ginger-garlic paste',
      '1 teaspoon turmeric',
      '2 teaspoons coriander powder',
      '1 teaspoon garam masala',
      '1/2 teaspoon red chili powder',
      '1/2 cup coconut milk',
      'Fresh cilantro for garnish',
    ],
    instructions: [
      'Heat oil in a pan and sauté onions until golden',
      'Add ginger-garlic paste and cook for 1 minute',
      'Add tomato puree and cook until oil separates',
      'Add all spices and cook for 2 minutes',
      'Add coconut milk and simmer for 5 minutes',
      'Gently add hard-boiled eggs and coat with gravy',
      'Simmer for 5 minutes until eggs are heated through',
      'Garnish with fresh cilantro and serve with rice',
    ],
    nutrition: {
      calories: 285,
      protein: '16g',
      carbs: '12g',
      fat: '20g',
    },
  },
  {
    id: 10,
    name: 'Cloud Eggs',
    image:
      'https://i.pinimg.com/1200x/62/97/aa/6297aad4fe16237a150218eb816581dc.jpg',
    prepTime: '10 mins',
    cookTime: '8 mins',
    difficulty: 'Easy',
    description: 'Viral fluffy cloud eggs with crispy edges and runny yolk.',
    ingredients: [
      '2 large eggs',
      '2 tablespoons grated Parmesan cheese',
      'Pinch of salt and pepper',
      '1 tablespoon chopped fresh herbs (chives, parsley)',
      'Cooking spray or butter',
    ],
    instructions: [
      'Preheat oven to 450°F (230°C)',
      'Separate egg whites from yolks carefully',
      'Whisk egg whites with salt until stiff peaks form',
      'Gently fold in Parmesan cheese and herbs',
      'Create two mounds of egg white on baking sheet',
      'Make a well in the center of each mound',
      'Bake for 3 minutes until lightly golden',
      'Place yolk in the center of each cloud',
      'Bake for another 3 minutes until yolk is set',
      'Serve immediately',
    ],
    nutrition: {
      calories: 120,
      protein: '11g',
      carbs: '1g',
      fat: '8g',
    },
  },
  {
    id: 11,
    name: 'Egg Benedict',
    image:
      'https://i.pinimg.com/1200x/29/78/33/297833295f89a1e246187b0be34b5f95.jpg',
    prepTime: '20 mins',
    cookTime: '15 mins',
    difficulty: 'Hard',
    description:
      'Classic eggs Benedict with hollandaise sauce and English muffins.',
    ingredients: [
      '2 English muffins, split and toasted',
      '4 slices Canadian bacon or ham',
      '4 large eggs',
      '1 tablespoon white vinegar',
      'For Hollandaise: 3 egg yolks, 1 tablespoon lemon juice, 1/2 cup butter, salt, cayenne',
    ],
    instructions: [
      'Make hollandaise: whisk yolks and lemon juice over double boiler',
      'Slowly drizzle in melted butter while whisking constantly',
      'Season with salt and cayenne, keep warm',
      'Poach eggs: bring water with vinegar to simmer',
      'Create whirlpool and slide eggs in, cook 3-4 minutes',
      'Toast English muffins and warm Canadian bacon',
      'Assemble: muffin, bacon, poached egg, hollandaise',
      'Garnish with paprika and chives',
    ],
    nutrition: {
      calories: 450,
      protein: '22g',
      carbs: '22g',
      fat: '30g',
    },
  },
  {
    id: 12,
    name: 'Spanish Tortilla',
    image:
      'https://i.pinimg.com/1200x/35/26/43/352643ad05266d8ff374105e1f636662.jpg',
    prepTime: '15 mins',
    cookTime: '30 mins',
    difficulty: 'Medium',
    description:
      'Traditional Spanish potato and egg omelette, perfect for tapas.',
    ingredients: [
      '4 large potatoes, peeled and thinly sliced',
      '1 large onion, thinly sliced',
      '6 large eggs',
      '1/2 cup olive oil',
      'Salt to taste',
    ],
    instructions: [
      'Heat olive oil in a large non-stick skillet',
      'Cook potatoes and onions over medium-low heat until tender (20 mins)',
      'Drain potatoes and onions, reserving some oil',
      'Whisk eggs with salt in a large bowl',
      'Add cooked potatoes and onions to eggs, mix gently',
      'Heat 2 tablespoons reserved oil in skillet',
      'Pour egg-potato mixture into skillet',
      'Cook over low heat until set (10-12 mins)',
      'Flip tortilla using a plate and cook other side',
      'Serve warm or at room temperature',
    ],
    nutrition: {
      calories: 320,
      protein: '14g',
      carbs: '35g',
      fat: '14g',
    },
  },
];
// DOM Elements
const recipesGrid = document.getElementById('recipesGrid');
const downloadModal = document.getElementById('downloadModal');
const modalRecipeName = document.getElementById('modalRecipeName');
const closeModal = document.querySelector('.close-modal');
const contactForm = document.getElementById('contactForm');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

let currentRecipe = null;

// Initialize Application
document.addEventListener('DOMContentLoaded', function () {
  loadRecipes();
  initEventListeners();
  initSmoothScroll();
});

// Load Recipes
function loadRecipes() {
  recipesGrid.innerHTML = '';

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement('div');
    recipeCard.className = 'recipe-card';
    recipeCard.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
          <div class="recipe-content">
              <h3>${recipe.name}</h3>
              <div class="recipe-meta">
                  <span><i class="fas fa-clock"></i> Prep: ${recipe.prepTime}</span>
                  <span><i class="fas fa-fire"></i> Cook: ${recipe.cookTime}</span>
                  <span><i class="fas fa-signal"></i> ${recipe.difficulty}</span>
              </div>
              <p class="recipe-description">${recipe.description}</p>
              <button class="download-recipe" data-id="${recipe.id}">
                  <i class="fas fa-download"></i> Download Recipe
              </button>
          </div>
      `;
    recipesGrid.appendChild(recipeCard);
  });
}

// Event Listeners
function initEventListeners() {
  // Download recipe buttons
  document.addEventListener('click', function (e) {
    if (
      e.target.classList.contains('download-recipe') ||
      e.target.closest('.download-recipe')
    ) {
      const button = e.target.classList.contains('download-recipe')
        ? e.target
        : e.target.closest('.download-recipe');
      const recipeId = parseInt(button.getAttribute('data-id'));
      openDownloadModal(recipeId);
    }
  });

  // Download format buttons
  document.addEventListener('click', function (e) {
    if (
      e.target.classList.contains('download-btn') ||
      e.target.closest('.download-btn')
    ) {
      const button = e.target.classList.contains('download-btn')
        ? e.target
        : e.target.closest('.download-btn');
      const format = button.getAttribute('data-format');
      downloadRecipe(currentRecipe, format);
    }
  });

  // Close modal
  closeModal.addEventListener('click', closeDownloadModal);

  // Close modal when clicking outside
  downloadModal.addEventListener('click', function (e) {
    if (e.target === downloadModal) {
      closeDownloadModal();
    }
  });

  // Contact form
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }

  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }
}

// Mobile Menu
function toggleMobileMenu() {
  navLinks.classList.toggle('active');
}

// Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        // Close mobile menu if open
        navLinks.classList.remove('active');
      }
    });
  });
}

// Download Modal
function openDownloadModal(recipeId) {
  currentRecipe = recipes.find((recipe) => recipe.id === recipeId);
  if (currentRecipe) {
    modalRecipeName.textContent = currentRecipe.name;
    downloadModal.style.display = 'block';
  }
}

function closeDownloadModal() {
  downloadModal.style.display = 'none';
  currentRecipe = null;
}

// Create Recipe Content for Download
function createRecipeContent(recipe) {
  let content = `EGGCELLENT RECIPE\n`;
  content += `================\n\n`;
  content += `${recipe.name.toUpperCase()}\n`;
  content += `${'='.repeat(recipe.name.length)}\n\n`;

  content += `Description: ${recipe.description}\n\n`;

  content += `Preparation Time: ${recipe.prepTime}\n`;
  content += `Cooking Time: ${recipe.cookTime}\n`;
  content += `Difficulty: ${recipe.difficulty}\n\n`;

  content += `NUTRITION INFORMATION:\n`;
  content += `- Calories: ${recipe.nutrition.calories}\n`;
  content += `- Protein: ${recipe.nutrition.protein}\n`;
  content += `- Carbohydrates: ${recipe.nutrition.carbs}\n`;
  content += `- Fat: ${recipe.nutrition.fat}\n\n`;

  content += `INGREDIENTS:\n`;
  content += `------------\n`;
  recipe.ingredients.forEach((ingredient, index) => {
    content += `${index + 1}. ${ingredient}\n`;
  });

  content += `\nINSTRUCTIONS:\n`;
  content += `-------------\n`;
  recipe.instructions.forEach((instruction, index) => {
    content += `Step ${index + 1}: ${instruction}\n`;
  });

  content += `\n\nTips:\n`;
  content += `- Use fresh eggs for best results\n`;
  content += `- Store leftovers in airtight container in refrigerator\n`;
  content += `- Reheat gently to maintain texture\n\n`;

  content += `Downloaded from EggCellent Recipes\n`;
  content += `World Egg Day Celebration\n`;
  content += `University Project - ${new Date().getFullYear()}\n`;

  return content;
}

// Download Recipe Function
function downloadRecipe(recipe, format) {
  if (!recipe) return;

  let content = '';
  let filename = `${recipe.name.replace(/\s+/g, '_')}_Recipe`;
  let mimeType = '';

  if (format === 'pdf') {
    // For PDF, we'll create a text file that can be printed as PDF
    content = createRecipeContent(recipe);
    filename += '.txt';
    mimeType = 'text/plain';

    // Show message about printing to PDF
    setTimeout(() => {
      alert(
        'For best PDF results, after downloading the .txt file:\n1. Open the file\n2. Go to File → Print\n3. Choose "Save as PDF" as your printer\n4. Save the PDF file'
      );
    }, 500);
  } else {
    // Text format
    content = createRecipeContent(recipe);
    filename += '.txt';
    mimeType = 'text/plain';
  }

  // Create and download file
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  // Close modal after download
  closeDownloadModal();

  // Show success message
  showNotification(
    `Recipe downloaded successfully as ${format.toUpperCase()}!`
  );
}

// Contact Form Handler
function handleContactForm(e) {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // Simple validation
  if (!name || !email || !message) {
    showNotification('Please fill in all fields!', 'error');
    return;
  }

  // Simulate form submission
  showNotification('Thank you for your message! We will get back to you soon.');

  // Reset form
  contactForm.reset();
}

// Notification System
function showNotification(message, type = 'success') {
  // Remove existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
      <div class="notification-content">
          <i class="fas ${
            type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'
          }"></i>
          <span>${message}</span>
      </div>
  `;

  // Add styles if not already added
  if (!document.querySelector('#notification-styles')) {
    const styles = document.createElement('style');
    styles.id = 'notification-styles';
    styles.textContent = `
          .notification {
              position: fixed;
              top: 100px;
              right: 20px;
              background: var(--primary);
              color: var(--text);
              padding: 1rem 1.5rem;
              border-radius: 10px;
              box-shadow: var(--shadow);
              z-index: 3000;
              animation: slideInRight 0.3s ease;
              max-width: 300px;
          }
          
          .notification.error {
              background: #ff6b6b;
              color: white;
          }
          
          .notification-content {
              display: flex;
              align-items: center;
              gap: 10px;
          }
          
          @keyframes slideInRight {
              from {
                  transform: translateX(100%);
                  opacity: 0;
              }
              to {
                  transform: translateX(0);
                  opacity: 1;
              }
          }
      `;
    document.head.appendChild(styles);
  }

  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 3000);
}

// Add slideOutRight animation
if (!document.querySelector('#notification-animations')) {
  const animations = document.createElement('style');
  animations.id = 'notification-animations';
  animations.textContent = `
      @keyframes slideOutRight {
          from {
              transform: translateX(0);
              opacity: 1;
          }
          to {
              transform: translateX(100%);
              opacity: 0;
          }
      }
  `;
  document.head.appendChild(animations);
}

// Add loading state for better UX
function showLoadingState(show = true) {
  if (show) {
    const loader = document.createElement('div');
    loader.className = 'loading-overlay';
    loader.innerHTML = `
          <div class="loading-spinner">
              <i class="fas fa-egg fa-spin"></i>
              <p>Loading...</p>
          </div>
      `;
    loader.id = 'global-loader';
    document.body.appendChild(loader);

    // Add loading styles
    if (!document.querySelector('#loading-styles')) {
      const styles = document.createElement('style');
      styles.id = 'loading-styles';
      styles.textContent = `
              .loading-overlay {
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: rgba(255, 255, 255, 0.9);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  z-index: 4000;
              }
              
              .loading-spinner {
                  text-align: center;
              }
              
              .loading-spinner i {
                  font-size: 3rem;
                  color: var(--accent);
                  margin-bottom: 1rem;
              }
              
              .loading-spinner p {
                  color: var(--text);
                  font-weight: bold;
              }
              
              .fa-spin {
                  animation: fa-spin 2s infinite linear;
              }
          `;
      document.head.appendChild(styles);
    }
  } else {
    const loader = document.getElementById('global-loader');
    if (loader) {
      loader.remove();
    }
  }
}

// Enhanced recipe search functionality (bonus feature)
function initRecipeSearch() {
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search recipes...';
  searchInput.className = 'recipe-search';

  // Insert search bar before recipes grid
  const recipesSection = document.querySelector('.recipes .container');
  if (recipesSection) {
    const heading = recipesSection.querySelector('h2');
    recipesSection.insertBefore(searchInput, heading.nextSibling);

    // Add search styles
    if (!document.querySelector('#search-styles')) {
      const styles = document.createElement('style');
      styles.id = 'search-styles';
      styles.textContent = `
              .recipe-search {
                  width: 100%;
                  max-width: 400px;
                  padding: 12px 20px;
                  margin: 20px auto;
                  display: block;
                  border: 2px solid var(--primary);
                  border-radius: 25px;
                  font-size: 1rem;
                  outline: none;
                  transition: var(--transition);
              }
              
              .recipe-search:focus {
                  border-color: var(--accent);
                  box-shadow: 0 0 10px rgba(255, 107, 53, 0.3);
              }
          `;
      document.head.appendChild(styles);
    }

    // Add search functionality
    searchInput.addEventListener('input', function (e) {
      const searchTerm = e.target.value.toLowerCase();
      filterRecipes(searchTerm);
    });
  }
}

function filterRecipes(searchTerm) {
  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm) ||
      recipe.description.toLowerCase().includes(searchTerm) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm)
      )
  );

  // Reload recipes with filtered results
  recipesGrid.innerHTML = '';

  if (filteredRecipes.length === 0) {
    recipesGrid.innerHTML = `
          <div class="no-results">
              <i class="fas fa-search"></i>
              <h3>No recipes found</h3>
              <p>Try searching with different keywords</p>
          </div>
      `;
    return;
  }

  filteredRecipes.forEach((recipe) => {
    const recipeCard = document.createElement('div');
    recipeCard.className = 'recipe-card';
    recipeCard.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
          <div class="recipe-content">
              <h3>${recipe.name}</h3>
              <div class="recipe-meta">
                  <span><i class="fas fa-clock"></i> Prep: ${recipe.prepTime}</span>
                  <span><i class="fas fa-fire"></i> Cook: ${recipe.cookTime}</span>
                  <span><i class="fas fa-signal"></i> ${recipe.difficulty}</span>
              </div>
              <p class="recipe-description">${recipe.description}</p>
              <button class="download-recipe" data-id="${recipe.id}">
                  <i class="fas fa-download"></i> Download Recipe
              </button>
          </div>
      `;
    recipesGrid.appendChild(recipeCard);
  });
}

// Initialize search functionality
initRecipeSearch();

// Add World Egg Day countdown (bonus feature)
function initEggDayCountdown() {
  const currentYear = new Date().getFullYear();
  const eggDay = new Date(`October 10, ${currentYear} 00:00:00`);
  const today = new Date();

  // If World Egg Day has passed this year, show next year's
  if (today > eggDay) {
    eggDay.setFullYear(currentYear + 1);
  }

  const countdownElement = document.createElement('div');
  countdownElement.className = 'egg-day-countdown';
  countdownElement.innerHTML = `
      <div class="countdown-content">
          <h3><i class="fas fa-calendar-alt"></i> World Egg Day Countdown</h3>
          <div class="countdown-timer">
              <div class="countdown-item">
                  <span class="countdown-number" id="countdown-days">0</span>
                  <span class="countdown-label">Days</span>
              </div>
              <div class="countdown-item">
                  <span class="countdown-number" id="countdown-hours">0</span>
                  <span class="countdown-label">Hours</span>
              </div>
              <div class="countdown-item">
                  <span class="countdown-number" id="countdown-minutes">0</span>
                  <span class="countdown-label">Minutes</span>
              </div>
              <div class="countdown-item">
                  <span class="countdown-number" id="countdown-seconds">0</span>
                  <span class="countdown-label">Seconds</span>
              </div>
          </div>
      </div>
  `;

  // Insert countdown in hero section
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.appendChild(countdownElement);

    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
  }
}

function updateCountdown() {
  const currentYear = new Date().getFullYear();
  const eggDay = new Date(`October 10, ${currentYear} 00:00:00`);
  const now = new Date();

  if (now > eggDay) {
    eggDay.setFullYear(currentYear + 1);
  }

  const timeRemaining = eggDay - now;

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // Update DOM elements
  const daysElement = document.getElementById('countdown-days');
  const hoursElement = document.getElementById('countdown-hours');
  const minutesElement = document.getElementById('countdown-minutes');
  const secondsElement = document.getElementById('countdown-seconds');

  if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
  if (hoursElement)
    hoursElement.textContent = hours.toString().padStart(2, '0');
  if (minutesElement)
    minutesElement.textContent = minutes.toString().padStart(2, '0');
  if (secondsElement)
    secondsElement.textContent = seconds.toString().padStart(2, '0');
}

// Initialize World Egg Day countdown
initEggDayCountdown();
