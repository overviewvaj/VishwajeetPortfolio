using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace VishwajeetPortfolio.Pages;

public class ErrorModel : PageModel
{
    public int StatusCode { get; private set; }

    public string ErrorTitle { get; private set; } = "Something went wrong.";

    public string ErrorDescription { get; private set; }
        = "The page you are looking for could not be found.";

    public void OnGet(int? statusCode)
    {
        StatusCode = statusCode ?? 500;

        switch (StatusCode)
        {
            case 404:

                ErrorTitle = "This page doesn't exist.";

                ErrorDescription =
                    "The page you are looking for may have moved, " +
                    "been removed, or may not have been built yet.";

                break;


            case 403:

                ErrorTitle = "Access denied.";

                ErrorDescription =
                    "You do not have permission to access this page.";

                break;


            case 500:

                ErrorTitle = "Something went wrong.";

                ErrorDescription =
                    "An unexpected error occurred while processing " +
                    "your request.";

                break;


            default:

                ErrorTitle = "Something went wrong.";

                ErrorDescription =
                    "The requested page could not be displayed.";

                break;
        }
    }
}