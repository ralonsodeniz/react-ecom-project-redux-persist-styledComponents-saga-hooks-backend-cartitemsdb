import React, { lazy, Suspense } from "react";
import { Route, withRouter } from "react-router-dom";

import Spinner from "../../components/spinner/spinner.component";

const UserInfoContainer = lazy(() =>
  import("../../components/user/user.component.jsx")
);
const OrderDetailsContainer = lazy(() =>
  import("../../components/order-details/order-details.component.jsx")
);

const AccountPage = ({ match }) => (
  <div>
    <Suspense fallback={<Spinner />}>
      <Route exact path={`${match.path}`} component={UserInfoContainer} />
      <Route
        path={`${match.path}/:orderId`}
        component={OrderDetailsContainer}
      />
    </Suspense>
  </div>
);

export default withRouter(AccountPage);
