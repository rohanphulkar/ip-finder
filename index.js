import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import geoip from "geoip-lite";
import axios from "axios";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

async function getIpAddress() {
  try {
    const { data: result } = await axios.get("https://ipinfo.io/json");
    return result.ip;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function getLocation(ipAddress) {
  return geoip.lookup(ipAddress);
}

app.get("/", async (req, res) => {
  const ipAddress = await getIpAddress(req);
  const location = await getLocation(ipAddress);
  res.json(location);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
