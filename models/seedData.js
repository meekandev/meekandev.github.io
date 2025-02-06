const drinks = require('./drinks');

async function seedDatabase(Drink) {
    try {
        // Clear existing data
        await Drink.destroy({ where: {} });

        // Import brewed drinks
        for (const drink of drinks.brewed) {
            await Drink.create({
                name: drink.name,
                category: 'brewed',
                hot: drink.hot,
                iced: drink.iced,
                menuBuildHot: drink.menuBuildHot,
                menuBuildIced: drink.menuBuildIced,
                abbreviation: drink.abbr
            });
        }

        // Import espresso drinks
        for (const drink of drinks.espresso) {
            await Drink.create({
                name: drink.name,
                category: 'espresso',
                hot: drink.hot,
                iced: drink.iced,
                menuBuildHot: drink.menuBuildHot,
                menuBuildIced: drink.menuBuildIced,
                abbreviation: drink.abbr,
                instructions: drink.instructions,
                hotBuild: drink.hotBuild,
                icedBuild: drink.icedBuild
            });
        }

        // Import blended drinks
        for (const drink of drinks.blended) {
            await Drink.create({
                name: drink.name,
                category: 'blended',
                hot: drink.hot,
                iced: true,
                menuBuildHot: drink.menuBuildHot,
                menuBuildIced: drink.menuBuildIced,
                abbreviation: drink.abbr,
                instructions: drink.instructions,
                build: drink.build,
                whippedCream: drink.whippedCream,
                topping: drink.topping,
                layered: drink.layered
            });
        }

        // Import tea drinks
        for (const drink of drinks.tea) {
            await Drink.create({
                name: drink.name,
                category: 'tea',
                hot: drink.hot,
                iced: drink.iced,
                menuBuildHot: drink.menuBuildHot,
                menuBuildIced: drink.menuBuildIced,
                abbreviation: drink.abbr
            });
        }

        // Import other drinks
        for (const drink of drinks.other) {
            await Drink.create({
                name: drink.name,
                category: 'other',
                hot: drink.hot,
                iced: drink.iced,
                menuBuildHot: drink.menuBuildHot,
                menuBuildIced: drink.menuBuildIced,
                abbreviation: drink.abbr
            });
        }

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    }
}

module.exports = seedDatabase;
