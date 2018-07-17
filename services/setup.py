from setuptools import setup, find_packages

reqs = [
    'flask'
]

test_reqs = ['pytest', 'pytest-sugar', 'pytest-cov', 'pylint']

setup(
    name='bg_forms',
    description='services for managing brooke glen forms',
    author='Matt Robinson',
    author_email='matt@dataflock.io',
    packages=find_packages(),
    version='0.1.1',
    install_requires=reqs,
    extras_require={
        'test': test_reqs
    }
)
