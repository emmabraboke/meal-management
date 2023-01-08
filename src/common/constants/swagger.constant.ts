export const SwaggerConstant = {
  createUser: {
    summary: 'Create User',
    description: "This creates the user's account",
  },

  logIn: {
    summary: 'Log In',
    description:
      'After a successful login, the response returned contains the access token use to authenticate the user',
  },

  createBrand: {
    summary: 'Create Brand',
    description: 'This creates a new brand name',
  },

  fetchAllBrand: {
    summary: 'fetch All Brand',
    description: 'Fetches all the brand names',
  },

  createMealAddon: {
    summary: 'Create Meal Addon',
    description: 'Creates a new meal addon for the specified brand.',
  },

  fetchMealAddonByBrandId: {
    summary: 'Fetch Meal Addons By BrandId',
    description: 'Retrieve a list of all meal addons for the specified brand.',
  },

  fetchMealAddon: {
    summary: 'Fetch Meal Addon For The Specified Brand',
    description:
      'Retrieve a single meal addon by its ID for the specified brand.',
  },

  updateMealAddon: {
    summary: 'Update Meal Addon For The Specified Brand',
    description:
      'Update a single meal addon by its ID for the specified brand.',
  },

  deleteMealAddon: {
    summary: 'Delete Meal Addon For The Specified Brand',
    description:
      'Delete a single meal addon by its ID for the specified brand.',
  },

  fetchAllMealAddonCategory: {
    summary: 'Fetch All Meal Addon Category',
    description: 'Fetches all the meal addon category',
  },

  createMealAddonCategory: {
    summary: 'Create Meal Addon Category For The Specified Brand',
    description:
      'Create a new category for meal addons for the specified brand.',
  },
};
