# Pokedex App

The Pokedex App is a dynamic and interactive tool designed for Pokemon enthusiasts. It provides a comprehensive database of all Pokemon species, complete with detailed information on their abilities, types, stats, and moves. Users can easily search for their favorite Pokemon, view high-quality images, and learn about their characteristics. Additionally, the app allows users to create teams and play "Who's That Pokemon." This app caters to both casual Pokemon fans and hardcore collectors, allowing them to track their progress, discover new Pokemon, and enhance their Pokemon experience. Whether you're a newcomer to the series or a seasoned trainer, the Pokedex App brings the entire Pokemon universe to your fingertips.
## Features

- Create Teams
- Fetch from PokeAPI to see Pokemon stats
- "Who's That Pokemon" guessing game
- Mobile and PC compatibility


## Environment Variables

To run this project, you will need to add the following environment variables to your .env files
`PORT` 
`MONGODB_URI`
`DB_NAME`
`GOOGLE_CLIENT_ID`
`GOOGLE_CLIENT_SECRET`
`SECRET_KEY`
`REACT_BASE_URL`
`VITE_GOOGLE_CLIENT_ID`# Installation Guide

### 1. Clone the Repository and Install Dependencies
Open your terminal and follow these steps:

```bash
cd Pokedex
npm install
```

- **Step 1**: Clone the repository to your local machine:
  [![Step1](https://i.postimg.cc/bYWvkpJ9/image.png)](https://postimg.cc/vD7MdR54)

- **Step 2**: Navigate into the `Pokedex` directory:
  [![Step2](https://i.postimg.cc/pVzdf3FN/image.png)](https://postimg.cc/mhZRRXjV)

### 2. Create the .env File
In the root directory of the repository, create a `.env` file with the following content:

```bash
VITE_GOOGLE_CLIENT_ID=...
```

- **Step 3**: Set up the `.env` file for the client-side configuration:
  [![Step3](https://i.postimg.cc/TPBRmc2Y/image.png)](https://postimg.cc/p9YbMzng)

### 3. Clone the Server Repository
Next, clone the server repository that handles backend operations:

```bash
git clone https://github.com/dltvn/PokedexServer
```

- **Step 4**: Clone the server repository:
  [![Step5](https://i.postimg.cc/bNYjZ509/image.png)](https://postimg.cc/w3rrP0G1)

### 4. Setup the .env File for the Server
Move into the `PokedexServer` directory and create another `.env` file with the following configurations:

```bash
PORT=...
MONGODB_URI=...
DB_NAME=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
SECRET_KEY=...
REACT_BASE_URL=...
```

- **Step 5**: Set up the `.env` file for the server:
  [![Step6](https://i.postimg.cc/LsLWCkBs/image.png)](https://postimg.cc/gwc4rZ79)

### 5. Install Server Dependencies
From the `PokedexServer` directory, install the necessary dependencies:

```bash
cd PokedexServer
npm install
```

- **Step 6**: Install server dependencies:
  [![Step7](https://i.postimg.cc/nrz0Jq7B/image.png)](https://postimg.cc/47Dzv7Wx)

### 6. Run the Server
To start the server, run the following command in the `PokedexServer` directory:

```bash
node index.js
```

- **Step 7**: Start the server:
  [![Step8](https://i.postimg.cc/RV2Gk60J/image.png)](https://postimg.cc/tYthPgW9)

### 7. Start the Vite Server
Finally, in the `Pokedex` directory, start the Vite development server:

```bash
npm run dev
```

- **Step 8**: Start the Vite server:
  [![Step9](https://i.postimg.cc/V6sFqXKp/image.png)](https://postimg.cc/4KMtZHkQ)

### 8. Enjoy Using Pokedex!
Your development environment is now set up. Open your browser and navigate to the appropriate URL to start using the Pokedex application.

- **Step 9**: Enjoy using the Pokedex application:
  [![Step10](https://i.postimg.cc/pr4YM4PM/image.png)](https://postimg.cc/q6cC8mt1)

---

Make sure all required environment variables are correctly set in the `.env` files for both the client and server sides to ensure smooth operation of the application.
## Usage/Examples

### Front Page

[![Step1](https://i.postimg.cc/pr4YM4PM/image.png)](https://postimg.cc/q6cC8mt1)
Click on bulbasaur
[![image.png](https://i.postimg.cc/m295Vf3s/image.png)](https://postimg.cc/LnHD6W0C)
Open the modal
[![image.png](https://i.postimg.cc/zGSPZCP2/image.png)](https://postimg.cc/Js0Qjk8j)
Catch Pokemon
[![image.png](https://i.postimg.cc/rsXSwbD1/image.png)](https://postimg.cc/8J4FyZBc)
### Nav Bar
Navigate through the pages
[![image.png](https://i.postimg.cc/QtPWF7wp/image.png)](https://postimg.cc/2bQ5J1z6)
### Pokedex page
See caught pokemon can click to open modal once again
[![image.png](https://i.postimg.cc/wjvsgHWK/image.png)](https://postimg.cc/PPgqMGsK)
### Teams Page
Click pokemon from bottom to add to Team
[![image.png](https://i.postimg.cc/d1QbSHs9/image.png)](https://postimg.cc/t1fvszV1)
Double click button to change team name
[![image.png](https://i.postimg.cc/W39BRGtc/image.png)](https://postimg.cc/WFkWgJM5)
You can click off close the tab and do whatever the teams will save locally
### Guessing Game
Classic who's that pokemon game 10 seconds and 3 lives to get the pokemon right
[![image.png](https://i.postimg.cc/Ls2wnC1M/image.png)](https://postimg.cc/NKCpnxDN)
[![image.png](https://i.postimg.cc/BbrwsM0k/image.png)](https://postimg.cc/LgVV3kh3)

# PokeAPI Reference

## API Endpoints

### 1. **Get All Items**
   - **Endpoint**: `GET /api/items`
   - **Parameters**:
     - `api_key` (string) **Required**: Your unique API key for authentication.
   - **Description**: Fetches a list of all available items from the PokeAPI.

   ```http
   GET /api/items
   ```

   | Parameter | Type     | Description                |
   | :-------- | :------- | :------------------------- |
   | `api_key` | `string` | **Required**. Your API key |

   - **Example**:
     ```bash
     curl -X GET "https://pokeapi.co/api/items?api_key=your_api_key"
     ```

### 2. **Get Item by ID**
   - **Endpoint**: `GET /api/items/${id}`
   - **Parameters**:
     - `id` (string) **Required**: The unique identifier of the item you wish to fetch.
   - **Description**: Retrieves the details of a specific item using its ID.

   ```http
   GET /api/items/${id}
   ```

   | Parameter | Type     | Description                       |
   | :-------- | :------- | :-------------------------------- |
   | `id`      | `string` | **Required**. Id of item to fetch |

   - **Example**:
     ```bash
     curl -X GET "https://pokeapi.co/api/items/1?api_key=your_api_key"
     ```

## Authors

- [@bellella](https://github.com/bellella)
- [@dltvn](https://github.com/dltvn)
- [@peggy8337](https://github.com/peggy8337)
- [@jinal patel](https://github.com/jinal108)
- [@Saaram](https://github.com/bellella)



## Feedback

If you have any feedback, please reach out to us at rashidisaaram@gmail.com

