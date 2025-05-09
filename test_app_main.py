import unittest
from main_app import app

class TestFlaskApp(unittest.TestCase):  # <-- Change here
    def setUp(self):
        app.config['TESTING'] = True
        self.client = app.test_client()

    def test_home(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"CI/CD Dashboard", response.data)

if __name__ == '__main__':
    unittest.main()
