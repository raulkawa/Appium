const wdio = require("webdriverio");

const opts = {
    path: '/wd/hub',
    port: 4723,
    capabilities: {
        platformName: "Android",
        platformVersion: "14.0", // Ensure this matches your emulator
        deviceName: "Pixel 8 API 34", // Ensure this matches your emulator
        app: "C:/Users/rahul/Downloads/TheApp.apk", // Ensure this path is correct
        automationName: "UiAutomator2",
        //noReset: true, // Optional: Prevents the app from being reset between sessions
        //fullReset: true  // Optional: Set to true if you want to reset the app state
    }
};

async function main() {
    const client = await wdio.remote(opts);

    async function loginTest(client, username, password, shouldSucceed) {
        // Navigate to the login screen
        const loginButton = await client.$("~Login Screen"); // Accessibility ID for the login screen
        await loginButton.waitForDisplayed({ timeout: 5000 });
        await loginButton.click();
        
        // Interact with the login form
        const usernameField = await client.$("~username"); // Accessibility ID for username field
        const passwordField = await client.$("~password"); // Accessibility ID for password field
        const submitButton = await client.$("~loginBtn"); // Accessibility ID for login button
        
        await usernameField.setValue(username);
        await passwordField.setValue(password);
        await submitButton.click();
        
        if (shouldSucceed) {
            // Validate navigation to the SecretScreen
            const secretScreenTitle = await client.$("//android.widget.TextView[@text='Secret Area']");
            await secretScreenTitle.waitForDisplayed({ timeout: 5000 });
            const titleText = await secretScreenTitle.getText();
            console.log("Successfully navigated to:", titleText);
            if (titleText !== 'Secret Area') {
                throw new Error("Failed to navigate to Secret Area");
            }
        } else {
            // Validate that an error message is displayed
            const errorMessage = await client.$("~errorMessage"); // Adjust this selector based on your app
            await errorMessage.waitForDisplayed({ timeout: 5000 });
            const errorText = await errorMessage.getText();
            console.log("Error message displayed:", errorText);
            if (!errorText.includes("Invalid login credentials")) {
                throw new Error("Expected error message not displayed");
            }
        }
    }

    // Test cases
    try {
        await loginTest(client, "alice", "mypassword", true); // Should succeed
        //await loginTest(client, "foo", "bar", false); // Should fail
    } catch (error) {
        console.error("Test failed:", error);
    } finally {
        await client.deleteSession();
    }
}

main();