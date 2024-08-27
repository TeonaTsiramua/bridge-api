const CATEGORIES = [
    'სატვირთო',
    'მისაბმელიანი',
    'მაცივარი',
    'სამშენებლო ტექნიკა',
    'ზამთრის ტრანსპორტი',
    'წყლის ტრანსპორტი',
    'სხვა',
];

const FUEL = ['ბენზინი', 'დიზელი', 'ელექტრო', 'LPG', 'CNG', 'სხვა'];

const GEARBOX = ['მექანიკური', 'ავტომატური', 'ნახევრად ავტომატური', 'სხვა'];

const LOCAL_PROVIDER = {
    bucket: './assets/images',
    opts: {
        baseUrl: '/assets/images',
    },
};

export { CATEGORIES, FUEL, GEARBOX, LOCAL_PROVIDER };
