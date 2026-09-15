Auth
Frontend Component	Endpoint	Method	Auth	Notes
app/(authGroup)/login/page.tsx → loginAction	/api/auth/login	POST	No	Body: { email, password }. Decodes returned JWT to read role and redirects to the matching dashboard (Admin, Landlord, Tenant). Sets accessToken httpOnly cookie.
app/(authGroup)/registration/page.tsx → registerAction	/api/auth/register	POST	No	Body: { name, email, password, role }
app/layout.tsx, app/(dashboardGroup)/dashboard/layout.tsx → service/getMe.ts	/api/auth/me	GET	Yes (cookie)	Fetches the current logged-in user; used to render NavBar and gate the dashboard layout.
shared/NavBar.tsx → service/logOut.tsx	— (no backend call)	—	—	Deletes the local accessToken cookie and redirects to /login.
Public Properties (no auth)
Frontend Component	Endpoint	Method	Auth	Notes
app/(publicGroup)/properties/page.tsx → getAllProperties	/api/properties/?searchTerm={t}	GET	No	Powers the public property listing + PropertySearch search box.
app/(publicGroup)/properties/[id]/page.tsx → getPropertyById	/api/properties/{id}	GET	No	Property detail page.
Tenant
Frontend Component	Endpoint	Method	Auth	Notes
_components/tenant/RequestRentalButton.tsx → isApplied	/api/rentals/isApplied	POST	Yes (cookie)	Body: { propertyId }. Checks if the tenant already applied before showing the request button.
_components/tenant/RequestRentalButton.tsx → requestForRent	/api/rentals	POST	Yes (cookie)	Body: { propertyId }. Submits a rental request.
dashboard/tenant/requests/page.tsx → getAllRequest	/api/rentals	GET	Yes (cookie)	Lists the tenant's rental requests (feeds PaymentButton and ReviewButton per row).
_components/payment/PaymentButton.tsx → create (paymentActions)	/api/payments/create	POST	Yes (cookie)	Body: { rentalId }. Returns data.paymentUrl, which the button redirects to.
_components/review/ReviewButton.tsx → reviewAction	/api/review	POST	Yes (cookie)	Body: { rentalId, propertyId, rating, review }.
app/(dashboardGroup)/payment/success/page.tsx, payment/cancel/page.tsx	— (no direct backend call)	—	—	Static redirect landing pages after the payment provider callback.
Landlord
Frontend Component	Endpoint	Method	Auth	Notes
dashboard/landloard/properties/page.tsx → getProperty	/api/landlord/properties/	GET	Yes (cookie)	Lists the landlord's own properties.
_components/landloard/AddProperty.tsx → createNewProperty	/api/landlord/properties	POST	Yes (cookie)	Body: { name, details, rent, type, location, image, categoryId }. categoryId is resolved client-side from a hardcoded type → categoryId map.
_components/landloard/AddProperty.tsx → updateProperty	/api/landlord/properties/{propertyId}	PUT	Yes (cookie)	Same body shape as create; used when editing an existing property.
_components/landloard/DeletePropertyButton.tsx → deleteProperty	/api/landlord/properties/{propertyId}	DELETE	Yes (cookie)	
dashboard/landloard/requests/page.tsx → getAllRequests	/api/landlord/properties/requests	GET	Yes (cookie)	Lists rental requests made against the landlord's properties.
_components/landloard/StatusButton.tsx → requestsDecision	/api/landlord/properties/requests/{propertyId}	PATCH	Yes (cookie)	Body: { status }. Approves/rejects a tenant's rental request.
Admin
Frontend Component	Endpoint	Method	Auth	Notes
dashboard/admin/users/page.tsx → getAllUsers	/api/admin/users?page={page}&searchTerm={searchTerm}	GET	Yes (cookie)	Paginated, searchable user list.
dashboard/admin/users/page.tsx → banUnban	/api/admin/users/{uid}	PATCH	Yes (cookie)	Body: { status: "BANNED" | "ACTIVE" }.
