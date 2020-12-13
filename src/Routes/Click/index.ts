import app, { router } from "@Routes/index";
import redirectTo from "@Routes/Redirect/redirectTo";

import { onRequest } from "@Config/Firebase";

redirectTo(router);

app.use("/click", router);

export default onRequest(app);
