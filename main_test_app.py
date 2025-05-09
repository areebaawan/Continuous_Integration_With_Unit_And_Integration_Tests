import unittest
from main_app import app

class FlaskAppTestCase(unittest.TestCase):
    # Set up the testing environment
    def setUp(self):
        app.config['TESTING'] = True
        self.client = app.test_client()

    # Test the home route
    def test_home(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"CI/CD Dashboard", response.data)  # Ensure the word 'Flask App' appears in the response

if __name__ == '__main__':
    unittest.main()
