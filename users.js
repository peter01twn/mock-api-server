const faker = require('faker');

faker.locale = 'zh_TW';

module.exports = () => {
    return { name: { name: faker.name.findName() } };
};
