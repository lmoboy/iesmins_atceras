export default function words(amount = 0) {
    const words = {
        categories: [
            {
                category: 'Fruits',
                words: [
                    'Apple',
                    'Banana',
                    'Orange',
                    'Grape',
                    'Strawberry',
                    'Blueberry',
                    'Raspberry',
                    'Mango',
                    'Pineapple',
                    'Kiwi',
                    'Watermelon',
                    'Cantaloupe',
                ],
            },
            {
                category: 'Vegetables',
                words: [
                    'Carrot',
                    'Broccoli',
                    'Spinach',
                    'Potato',
                    'Tomato',
                    'Cucumber',
                    'Onion',
                    'Garlic',
                    'Bell Pepper',
                    'Zucchini',
                    'Lettuce',
                    'Cabbage',
                ],
            },
            {
                category: 'Grains and Legumes',
                words: ['Rice', 'Wheat', 'Oats', 'Barley', 'Quinoa', 'Lentil', 'Chickpea', 'Black Bean', 'Kidney Bean', 'Soybean', 'Corn', 'Millet'],
            },
            {
                category: 'Dairy Products',
                words: [
                    'Milk',
                    'Cheese',
                    'Yogurt',
                    'Butter',
                    'Cream',
                    'Ice Cream',
                    'Sour Cream',
                    'Cottage Cheese',
                    'Whey',
                    'Ghee',
                    'Kefir',
                    'Buttermilk',
                ],
            },
            {
                category: 'Meats and Poultry',
                words: ['Beef', 'Chicken', 'Pork', 'Lamb', 'Turkey', 'Duck', 'Bacon', 'Sausage', 'Ham', 'Steak', 'Ground Beef', 'Venison'],
            },
            {
                category: 'Seafood',
                words: ['Salmon', 'Tuna', 'Cod', 'Shrimp', 'Crab', 'Lobster', 'Oyster', 'Mussel', 'Clam', 'Sardine', 'Mackerel', 'Trout'],
            },
            {
                category: 'Computing Hardware',
                words: [
                    'Processor',
                    'Motherboard',
                    'RAM',
                    'Hard Drive',
                    'SSD',
                    'Graphics Card',
                    'Power Supply',
                    'Monitor',
                    'Keyboard',
                    'Mouse',
                    'Webcam',
                    'Printer',
                ],
            },
            {
                category: 'Software Types',
                words: [
                    'Operating System',
                    'Word Processor',
                    'Spreadsheet',
                    'Database',
                    'Web Browser',
                    'Antivirus',
                    'Photo Editor',
                    'Video Editor',
                    'CAD Software',
                    'Accounting Software',
                    'Email Client',
                    'Gaming Software',
                ],
            },
            {
                category: 'Networking Terms',
                words: ['Router', 'Modem', 'Switch', 'Hub', 'Firewall', 'Ethernet', 'Wi-Fi', 'IP Address', 'DNS', 'VPN', 'Bandwidth', 'Protocol'],
            },
            {
                category: 'Mobile Technology',
                words: [
                    'Smartphone',
                    'Tablet',
                    'Smartwatch',
                    'Headphones',
                    'Bluetooth',
                    'GPS',
                    'App Store',
                    'Cellular Data',
                    'Touchscreen',
                    'Battery',
                    'Camera',
                    'Microphone',
                ],
            },
            {
                category: 'Emerging Technologies',
                words: [
                    'Artificial Intelligence',
                    'Machine Learning',
                    'Blockchain',
                    'Cryptocurrency',
                    'Virtual Reality',
                    'Augmented Reality',
                    'Internet of Things',
                    'Robotics',
                    'Quantum Computing',
                    'Biotechnology',
                    'Nanotechnology',
                    '3D Printing',
                ],
            },
            {
                category: 'Cybersecurity',
                words: [
                    'Malware',
                    'Phishing',
                    'Encryption',
                    'Firewall',
                    'Antivirus',
                    'Password',
                    'Authentication',
                    'Vulnerability',
                    'Exploit',
                    'Hacking',
                    'Data Breach',
                    'Cyberattack',
                ],
            },
        ],
    };
    function getRandomCategories(amount: number) {
        const shuffledCategories = words.categories
            .map((category) => ({ ...category, words: category.words.sort(() => 0.5 - Math.random()).slice(0, amount) }))
            .sort(() => 0.5 - Math.random())
            .slice(0, 6);

        return shuffledCategories;
    }
    if (amount <= 0) {
        return getRandomCategories(10);
    }
    return getRandomCategories(amount);
}
