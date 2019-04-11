const Person = {
	login: {
        url: '/api/person/login',
        private: false
    },
};

const Dashboard = {
    get: {
        url: '/api/dashboard/stats',
        private: true
    },
};

export default {
    Person,
    Dashboard,
}
