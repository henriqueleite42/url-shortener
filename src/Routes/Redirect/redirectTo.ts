import { Router } from "express";

import LinkEntity from "@Entities/Link";

import linkWasClicked from "@Controllers/Click";

import { OnError } from "@Config/Firebase";

function createRoute(router: Router) {
  router.get("/:id", async (req, res) => {
    try {
      const linkID = req.params.id;

      const linkEntity = new LinkEntity();

      const linkData = await linkEntity.getLink(linkID);

      linkWasClicked();

      res.redirect(linkData.redirectTo);
    } catch (e) {
      throw new OnError("unknown", e.message);
    }
  });
}

export default createRoute;
