import { Router } from "express";

import ClickEntity from "@Entities/Click";

import { OnError } from "@Config/Firebase";

function createRoute(router: Router) {
  router.post("/linkWasClicked", async (req, res) => {
    try {
      const { linkID, country, comeFrom } = req.body;

      const clickEntity = new ClickEntity();

      await clickEntity.create({
        linkID,
        country,
        comeFrom,
      });

      res.send();
    } catch (e) {
      throw new OnError("unknown", e.message);
    }
  });
}

export default createRoute;
