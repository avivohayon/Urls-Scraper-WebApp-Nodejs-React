// src/__tests__/LinkPreview.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Form from "../components/Form";
import LinkPreview from "../components/LinkPreview";
import PreviewCard from "../components/PreviewCard";
import { describe, expect, test } from "@jest/globals";
// src/setupTests.ts
import "@testing-library/jest-dom";

// Mock LinkPreview component
const mockPreviewData = {
  title:
    "South Park  -  Satirical Animated  TV Show | Watch Free Episodes | South Park Studios Global",
  description:
    "South Park is an American animated television series created by Trey Parker and Matt Stone.  Stream free-to-watch Full Episodes featuring Cartman, Kenny, Stan and Kyle in South Park, create your own South Park Character with the Avatar Creator, and go behind the scenes or the award winning sereis.",
  imageUrl:
    "https://images.paramount.tech/uri/mgid:arc:imageassetref:shared.southpark.us.en:88778738-b9f9-42b7-8fcb-f2066aeb940f?format=jpg&width=1200&height=630&crop=true",
  url: "https://www.southparkstudios.com",
};

// describe("Form Component", () => {
//   test("renders form with input and submit button", () => {
//     render(<Form onSubmit={() => {}} />);
//     expect(screen.getByPlaceholderText("Enter URLs")).toBeInTheDocument();
//     expect(screen.getByText("Submit")).toBeInTheDocument();
//   });

//   test("displays error message on invalid input", async () => {
//     render(<Form onSubmit={() => {}} />);
//     fireEvent.change(screen.getByPlaceholderText("Enter URLs"), {
//       target: { value: "invalid-url" },
//     });
//     fireEvent.click(screen.getByText("Submit"));
//     await waitFor(() => {
//       expect(screen.getByText("Invalid URL format")).toBeInTheDocument();
//     });
//   });

//   test("renders LinkPreview with data after form submission", async () => {
//     render(<Form onSubmit={() => {}} />);
//     fireEvent.change(screen.getByPlaceholderText("Enter URLs"), {
//       target: { value: "https://www.southparkstudios.com" },
//     });
//     fireEvent.click(screen.getByText("Submit"));
//     await waitFor(() => {
//       expect(
//         screen.getByText("Preview of https://www.southparkstudios.com")
//       ).toBeInTheDocument();
//     });
//   });
// });

// describe("LinkPreview Component", () => {
//   test("renders PreviewCard with correct data", () => {
//     render(<LinkPreview previewData={mockPreviewData} />);
//     expect(screen.getByText("Example Title")).toBeInTheDocument();
//     expect(screen.getByText("Example Description")).toBeInTheDocument();
//     expect(screen.getByAltText("Preview")).toHaveAttribute(
//       "src",
//       "https://www.southparkstudios.com/image.png"
//     );
//   });

//   test("renders error message when preview data is missing", () => {
//     render(<LinkPreview previewData={null} />);
//     expect(screen.getByText("No preview available")).toBeInTheDocument();
//   });
// });

describe("LinkPreview Component", () => {
  beforeEach(() => {
    fetch.resetMocks(); // Reset fetch mock before each test
  });

  test("renders form and initial UI state", () => {
    render(<LinkPreview />);
    expect(screen.getByText("Link Previewer")).toBeInTheDocument();
    expect(
      screen.getByText("Fetching link previews... 🤔🤔🤔")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("No metadata found for the provided URLs.")
    ).not.toBeInTheDocument();
  });

  test("displays loading state while fetching data", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockLinkData)); // Mock successful response
    render(<LinkPreview />);

    // Trigger form submission
    fireEvent.change(screen.getByPlaceholderText("Enter URLs"), {
      target: { value: "https://www.southparkstudios.com" },
    });
    fireEvent.click(screen.getByText("Submit"));

    // Verify loading message is shown
    expect(
      screen.getByText("Fetching link previews... 🤔🤔🤔")
    ).toBeInTheDocument();

    // Wait for fetch to complete and loading message to disappear
    await waitFor(() => {
      expect(
        screen.queryByText("Fetching link previews... 🤔🤔🤔")
      ).not.toBeInTheDocument();
    });
  });

  test("displays error message on fetch failure", async () => {
    fetch.mockRejectOnce(new Error("Network Error")); // Mock fetch failure

    render(<LinkPreview />);

    // Trigger form submission
    fireEvent.change(screen.getByPlaceholderText("Enter URLs"), {
      target: { value: "https://www.southparkstudios.com" },
    });
    fireEvent.click(screen.getByText("Submit"));

    // Wait for fetch to complete and error message to appear
    await waitFor(() => {
      expect(
        screen.getByText("Error fetching link previews: Error: Network Error")
      ).toBeInTheDocument();
    });
  });
});
