var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();


// =========================================================
// ERROR HANDLING
// =========================================================

if (!app.Environment.IsDevelopment())
{
    // Handles unhandled application exceptions.
    app.UseExceptionHandler("/Error");

    // Enables HSTS in production.
    app.UseHsts();
}


// =========================================================
// STATUS CODE HANDLING
// =========================================================

// Handles HTTP status codes such as 404.
// The original URL remains visible in the browser.
app.UseStatusCodePagesWithReExecute("/NotFound");


// =========================================================
// HTTPS
// =========================================================

app.UseHttpsRedirection();


// =========================================================
// ROUTING
// =========================================================

app.UseRouting();


// =========================================================
// AUTHORIZATION
// =========================================================

app.UseAuthorization();


// =========================================================
// STATIC ASSETS
// =========================================================

app.MapStaticAssets();


// =========================================================
// RAZOR PAGES
// =========================================================

app.MapRazorPages()
   .WithStaticAssets();


// =========================================================
// APPLICATION START
// =========================================================

app.Run();