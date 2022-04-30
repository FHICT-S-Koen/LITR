import dotenv
import os

def get_env(keys: list):
	dotenv.load_dotenv()
	values = []
	for key in keys:
		value = os.getenv(key)
		if value is None: raise Exception(f"{key} can't be empty")
		values.append(value)
	return values