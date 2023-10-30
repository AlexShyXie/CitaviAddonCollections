# [Add-Ons for Citavi 6](https://github.com/QSRINT/C6-Add-Ons-and-Online-Sources#add-ons-for-citavi-6)

# Adding DOI names from Linked PDF Files

You have a project in which many references do not have an entry in the DOI name field, but you know that your attached PDF files have a DOI name in them. You want to automatically add the DOI name to each reference.

1. On the **Tools** menu, click **Manage add-ons**.
2. Select the **Extract DOIs from linked PDFs** add-on. Then, click **Install** and restart Citavi.
3. On the **References** menu, click **Add DOIs from PDFs**.
4. This add-on will search all attached PDF files and enter DOI names that are found on the Reference tab.

# Calculating the Page Count

You want to determine the number of pages in a journal article, essay, or contribution.

1. On the **Tools** menu, click **Manage add-ons**.
2. Select the **Calculate Page Count** add-on. Then, click **Install** and restart Citavi.
3. For journal articles and contributions in edited books or conference proceedings, enter the first and last page of the reference in the **Page range** field. This add-on calculates the total number of pages and enters it in the **Page count** field. If you don't see this field on the **Reference** tab, click **More fields** and then select the checkbox next to the "Page count" field.

Hint

After installing the add-on it will automatically add the page count to new references you add to your project.



# Check Links and Change Access Date

Want to check if the links to webpages in your project are still valid?

This add-on checks checks all of the entries in the Online address field in your project to see if the webpage is still available. If it is, the add-on will enter the current date in the **Access date** field. In the **Notes** field you will see a short note for which changes the add-on made to each reference. If you want, you can tell the add-on to create a selection of the references that were not available under the online address.

1. On the **Tools** menu, click **Manage add-ons**.
2. Select the **Check links and change access date** add-on. Then, click **Install** and restart Citavi.
3. On the **References** menu, click **Check links and change access date**.
4. Wait until a window appears that shows the results of the check.

Please note

The check takes place in the background and can last a few minutes. No progress bar is displayed. While the add-on is working, you cannot continue working on your project.



# Converting a Citavi 6 project to Citavi 5 format

You created a project in Citavi 6. You now want to share this project with someone who is still using Citavi 5. This add-on exports Citavi 6 data in an XML file.

1. On the **Tools** menu, click **Manage add-ons**.
2. Select the **Convert a Citavi 6 project to Citavi 5 format** add-on. Then, click **Install** and restart Citavi.
3. If you were using a cloud project, [create a local copy](https://www1.citavi.com/sub/manual6/en/converting_cloud_projects.html).
4. Open the local project. On the **File** menu, click **This project** > **Export to Citavi 5**.
5. Enter a name for the XML file to be exported and click **Save**.
6. Copy the [macro for importing the Citavi 6 XML file in Citavi 5](https://www.citavi.com/github-makro-importc6xml) which you can find on Github.
7. Start Citavi 5.
8. Open an existing project or create a new project.
9. On the **Tools** menu, click **Macro editor**.
10. Enter the macro code (see step 6) that you copied to the Clipboard.
11. In the macro editor, click **Run**.
12. Select the XML file you created in the Citavi 6 project with the add-on.
13. Citavi wants to save a new project. Enter a name for the project.
14. Copy the contents of the Citavi 6 Attachments folder to the Attachments folder for the new Citavi 5 project.



# Correcting Author Names in All Caps

After importing references from an online database or an online search in Citavi, you might notice that some author names appear in all caps. The problem occurs because Citavi simply imports the entries as they appear in the original database. You can manually change individual author names by clicking **Lists** > **Persons and organizations**.

If you want to make changes to a lot of author names, you can use this add-on to correct them all at once.

1. On the **Tools** menu, click **Manage add-ons**.
2. Select the **Correct author names in all caps** add-on. Then, click **Install** and restart Citavi.
3. Create a [project backup](https://www1.citavi.com/sub/manual6/en/using_backups.html).
4. On the **Lists** menu, click **Persons and organizations**.
5. On the Persons menu, click **Correct author names in all caps**.
6. The author names will be corrected (for example, from JACOB, FELICITA to Jacob, Felicita).



# Display Macros

This add-on requires Citavi 6.8 or later.

You want to automate certain processes in Citavi. In the [Citavi Support protal](http://www.citavi.com/list-of-makros) you can find a collection of macros.

This add-on makes it easier to manage your macros.

1. On the **Tools** menu, click **Manage add-ons**.
2. Select the **Display Macros** add-on. Then, click **Install** and restart Citavi.
3. Click the new **Macros** menu entry.
4. Select **Configure**.
5. Select the folder on your comptuer that contains the macro files or where you want to save the macro files. The folder can contain sub-folders for better organization.
6. Click **Macros** and select the macro that you want to run or edit.



# Exporting Attachments to a Folder Tree

With this add-on you can export all attachments from a project.

If you are working with a cloud project, [download the attachments](https://www1.citavi.com/sub/manual6/en/downloading_attachments.html) before you run the add-on.

All of the attachments in a project will be exported to a folder structure that corresponds to your category tree in Citavi. Each PDF will be saved in a folder or folders named after the categories assigned to the reference the PDF is attached to.

Hint

If you want, you can first create a selection in your project and then only export the references for the current selection. This makes sense if you want to export the PDF files only for the references you cited in your document. To do this, open the Word document created with Citavi. Then, in Citavi, select the filter **[By quoted references in current document](https://www1.citavi.com/sub/manual6/en/wai_editing_cited_references.html)**.

1. On the **Tools** menu, click **Manage add-ons**.
2. Select the **Export attachments to a folder tree** add-on. Then, click **Install** and restart Citavi.
3. On the **References** menu, select **Export attachments to a folder tree**.



# Importing folders as categories

This add-on requires Citavi 6.5 or later.

You have a folder with subfolders containing PDF files. You now want to import the folder structure in Citavi as a category system and import the PDF files at the same time.

This add-on imports all PDFs as references and creates a category system containing the references.

1. On the **Tools** menu, click **Manage add-ons**.
2. Select the **Import folders as categories** add-on. Then, click **Install** and restart Citavi.
3. On the **References** menu, click **Import folders as categories**.
4. Select the top-level folder on your computer that contains the folders with the PDFs you want to import.
5. Wait until a window appears that displays the results of the import.

Please note

The import takes place in the background and can last a few minutes. No progress bar is displayed. While the add-on is working, you cannot continue working on your project.



# Importing Journal Abbreviations

Many citation styles in the Life Sciences require names of journals to be abbreviated in the bibliography. For example, instead of *The New England Journal of Medicine* the abbreviation *New Eng J Med* or *NEJM* would be used. In your project, you can add abbreviations manually under **Lists** > **Periodicals** after double-clicking a journal name.

The **Import journal abbreviations** add-on can add all the abbreviations for a particular abbreviation list at once.

1. On the **Tools** menu, click **Manage add-ons**.

1. Select the **Import journal abbreviations** add-on. Then, click **Install** and restart Citavi.
2. On the **Lists** menu, click **Periodicals**.
3. Click **Import journal abbreviations**.
4. Select the list source:
   1. From a file (see below)
   2. From PubMed if you're working with medical journals
   3. From the University of British Columbia if you're working with periodicals in the Natural Sciences.

## Importing From a File

The list of periodicals to be imported needs to be saved as a .txt file and needs to fulfill the following requirements:

- Contain one periodical per line.
- Contain a full name, up to 3 abbreviations, and an ISSN on each line.
- Use either a tab, semicolon, equals sign, or vertical bar as the delimiter.

The following are some examples of valid formats:

- Full name; Abbr. 1
- Full name; Abbr. 1; Abbr. 2
- Full name; Abbr. 1; Abbr. 2; Abbr. 3

- Full name; Abbr. 1; Abbr. 2; Abbr. 3; ISSN
- Full name;;;;ISSN



# Import sequence numbers

This add-on requires Citavi 6.5 or later.

You want to continue using the sequence numbers that were previously assigned to all references in previous Citavi versions.

To do so, import the sequence numbers from your old projects:

1. On the **Tools** menu, click **Manage add-ons**.
2. Select the **Import sequence numbers** add-on. Then, click **Install** and restart Citavi.
3. Open the project from Citavi 3, 4 or 5 in Citavi 6 (if you haven't already) to convert it to a *local* Citavi 6 project.
4. In Citavi 6, on the **File** menu, click **This project**.
5. Click **Import Sequence Numbers**. Select the Citavi 3, Citavi 4, or Citavi 5 project.
6. Select the custom field the sequence numbers should be imported into.



# Ordering Books and Articles by Email

This add-on requires Citavi 6.8 or later.

Use this add-on if you want to send a book order to your local bookstore or if you want to order a journal article from the responsible person in your company.

- For Outlook users:
  The add-on generates an email with a text of your choice to the email address you select. It will automatically insert the bibliographic information for the reference into the email.
- For users of other email programs:
  The add-on copies bibliographic information and a text of your choice to the Clipboard.

## Setting up the add-on

1. On the **Tools** menu, click **Manage add-ons**.
2. Select the **Order book by email** add-on. Then, click **Install** and restart Citavi.
3. On the **Tasks & Locations** tab, click **Order**.
4. If you want, save a short text for future orders. Click **Configure ordering** and enter the text of your choice. Here's a sample text:
   *Dear Sir or Madam,*
   *I would like to place an order for the book listed below to be picked up at your store. Please let me know once the book has arrived.*
   *Best regards,*
   *John Doe*
5. In the **Recipient (Outlook)** field, enter the email address for the person you want to send the order to.
6. Click **OK** to close the window.

## Sending your order

1. Switch to the reference you want to order.
2. On the **Tasks & Locations** tab, click **Order**.
3. Click either **Order by email (Outlook)** or **Order by email (Clipboard)**.



# Reference Counts

This add-on requires Citavi 6.5 or later.

This add-on creates lists that answer the following questions:

- What is the number of references in each category in the project?
- What is the number of references each person in the project wrote or contributed to?
- What is the number of references by author gender?  
- How often does a keyword appear in the project?
- What is the number of links to other references for each references?

Follow the steps below to install the add-on.

1. On the **Tools** menu, click **Manage add-ons**.
2. Select the **Reference counts** add-on. Then, click **Install** and restart Citavi.
3. On the **References** menu, click **Reference counts**.
4. Select the type of list you want to view.
5. Copy the list to the Clipboard. If you want to work with the list in MS Excel or another spreadsheet program, insert it with a text import wizard (file type "Fixed width").

# Save Table View Selection

This add-on requires Citavi 6.4 or later.

This add-on lets you save your selection of columns and groups as a work area.

1. On the **Tools** menu, click **Manage add-ons**.
2. Select the **Save table view selection** add-on. Then, click **Install** and restart Citavi.
3. To open the table view, in the **Reference Editor**, click **Table** ![Icon: Table View](Citavi%E6%8F%92%E4%BB%B6%E8%AF%B4%E6%98%8E/icon_tabelle.png) or press Alt+Ctrl+T.
4. Add [additional columns](https://www1.citavi.com/sub/manual6/en/sorting_in_table_view.html) or [group references](https://www1.citavi.com/sub/manual6/en/grouping_references.html) in the table as you want. Then, save your selections under **View** > **Work areas** > **Save new work area**.
5. The next time you want to use the saved work area in Table View, click **View** > **Work areas** and then select the work area you saved.

You can delete, rename, or sort your saved workspaces under **View** > **Work areas** > **Manage work areas**.



# Send reference by email

Please note:

This add-on requires Citavi 6.8 or later. It only works with Microsoft Outlook versions 2007 and later.

Use this add-on if you want to let another person know about a reference in your Citavi project and also send them the full text or other attachments.

1. On the **Tools** menu, click **Manage add-ons**.
2. Select the **Send reference by email** add-on. Then, click **Install** and restart Citavi.
3. In the Reference Editor switch to the reference you would like to send by email.
4. On the **References** menu, click **Send reference by email**.
5. Citavi starts Outlook and enters the reference's bibliographic information in a new email. Any attached files will also be added as attachments. To make it easy for the recipient to import the bibliographic information, a RIS file is also added to the email as an attachment.



# Sorting by Parent and Child References

This add-on requires Citavi 6.8 or later.

By default, Citavi sorts all references in the Reference Editor alphabetically by their short titles. This add-on adds an additional sorting option for the list of references to display contributions in a book underneath the book.

1. On the **Tools** menu, click **Manage add-ons**.
2. Select the **Sort by parent and child references** add-on. Then, click **Install** and restart Citavi.
3. On the navigation pane, right-click a reference in the list of references.
4. Click **Sort**.
5. Select **By short title (keep parent and child references together)**. Contributions will then appear indented underneath the book in which they appear.

# Synchronized Navigation of Categories and Keywords

This add-on ensures that the same category or the same keyword is selected in both the Reference Editor and the Knowledge Organizer.

To use this add-on, the categories or keywords column needs to be displayed in both the Reference Editor and the Knowledge Organizer. Click **View** > **Show category column** (Alt+5) or **Show keyword column** (Alt+4).

1. On the **Tools** menu, click **Manage add-ons**.
2. Select the **Synchronized Navigation of Categories and Keywords** add-on, click **Install** and restart Citavi.



# Updating Reference Information

This add-on requires Citavi 6.5 or later.

When you are working with a project that has many references with incomplete citation data, a portion of these references will have PubMed IDs or DOIs. You may wish to use these identifiers to overwrite the citation data you have with the full data from PubMed or CrossRef.

This add-on searches your project for references with a PubMed ID or DOI and runs a query for each identifier it finds. As soon as PubMed delivers the complete citation data, Citavi uses it to overwrite the existing citation data. If PubMed does not deliver any data or if the reference only has a DOI, a query is sent to CrossRef.

1. On the **Tools** menu, click **Manage add-ons**.
2. Select the **Use PMID to update reference information** add-on. Then, click **Install** and restart Citavi.
3. On the **References** menu, click **Update bibliographic information**.
4. Select whether abstracts, table of contents, keywords, and notes should be overwritten or remain the same.
5. Click **OK**.

# Using the Tomato Timer

This add-on requires Citavi 6.8 or later.

This add-on is designed to help you concentrate on your work in Citavi. It's a simplified version of the [Pomodoro technique](https://de.wikipedia.org/wiki/Pomodoro-Technik).

Follow the steps below to install the add-on.

1. On the **Tools** menu, click **Manage add-ons**.
2. Select the **Tomato Timer** add-on. Then, click **Install** and restart Citavi.
3. You will see a tomato icon in the bottom right of your Citavi project.
4. When you click the tomato, a 20-minute timer will start. During this "work phase" you should ignore all distractions (smartphone in flight mode, set chat program to "away", etc.).
5. After the 20-minute work phase, a 5-minute break will start. Use this time to get up and move around, get a cup of coffee, check messages, etc.
6. After 5 minutes the next work phase will start.
7. After four work and break phases, a 15-minute break will follow. This should ideally be used for some movement.

The timer is not project-specific. If you are working in multiple Citavi projects at once, the timer will still appear.

You can reset the timer by clicking it again.

You can find similar programs online or in the Windows Store, but this add-on is specific to your work in Citavi.



---------------------------

# AddCitaviProjectToRecentListAddon

This add-on adds the current project to the list of recently used files at the application icon in the taskbar. Only **desktop** projects are supported!

## Releases

The compiled library can be found under [releases](./../../releases) as an archive.

## Disclaimer

>There are no support claims by the company **Swiss Academic Software GmbH**, the provider of **Citavi** or other liability claims for problems or data loss. Any use is at your own risk. All rights to the name **Citavi** and any logos used are owned by **Swiss Academic Software GmbH**.

## License

This project is licensed under the [MIT](LICENSE) License
# JumpToLastPositionAfterActionExecutionAddon

This add-on adds in the **Tools** menu of Citavi's PDF Viewer the command **Jump to previous position...** with the key combination <kbd>ALT</kbd>+<kbd>F3</kbd>. The command is active if a jump has been made in the document by clicking on an internal link stored in the document. The last position before a jump is executed is always saved and this as long as the document is open.

## Releases

The compiled library can be found under [releases](./../../releases) as an archive.

## Disclaimer

>There are no support claims by the company **Swiss Academic Software GmbH**, the provider of **Citavi** or other liability claims for problems or data loss. Any use is at your own risk. All rights to the name **Citavi** and any logos used are owned by **Swiss Academic Software GmbH**.

## License

This project is licensed under the [MIT](LICENSE) License
# KnownProjectsCleanerAddon

This add-on checks if desktop projects are still available when you start Citavi and deletes them from the list of recently opened projects if it necessary.

## Releases

The compiled library can be found under [releases](./../../releases) as an archive.

## Disclaimer

>There are no support claims by the company **Swiss Academic Software GmbH**, the provider of **Citavi** or other liability claims for problems or data loss. Any use is at your own risk. All rights to the name **Citavi** and any logos used are owned by **Swiss Academic Software GmbH**.

## License

This project is licensed under the [MIT](LICENSE) License
# OfflineSwitchAddon

This add-on adds two shortcuts to the mainform of Citavi. The first one under **Tools** >> **Go online** / **Go offline** with the shortcut <kbd>CTRL</kbd>+<kbd>Q</kbd> to to go in online/offline mode. With the hidden shortcut <kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>Q</kbd> you run the dialog which is showed if you use the the command from startform.

## Releases

The compiled library can be found under [releases](./../../releases) as an archive.

## Disclaimer

>There are no support claims by the company **Swiss Academic Software GmbH**, the provider of **Citavi** or other liability claims for problems or data loss. Any use is at your own risk. All rights to the name **Citavi** and any logos used are owned by **Swiss Academic Software GmbH**.

## License

This project is licensed under the [MIT](LICENSE) License
# OpenFormsCenteredToParentAddon

This add-on sets for all opening windows derived from `FormBase` the property `StartPosition` to `FormStartPosition.CenterParent`.

## Releases

The compiled library can be found under [releases](./../../releases) as an archive.

## Disclaimer

>There are no support claims by the company **Swiss Academic Software GmbH**, the provider of **Citavi** or other liability claims for problems or data loss. Any use is at your own risk. All rights to the name **Citavi** and any logos used are owned by **Swiss Academic Software GmbH**.

## License

This project is licensed under the [MIT](LICENSE) License
# OpenWithAddon

This add-on adds in the context menu of a local file (tab **Title**) the command **Open with...** which calls the standard dialog of the Windows Explorer. This gives the possibility to open the files with another program than the standard application.

## Releases

The compiled library can be found under [releases](./../../releases) as an archive.

## Disclaimer

>There are no support claims by the company **Swiss Academic Software GmbH**, the provider of **Citavi** or other liability claims for problems or data loss. Any use is at your own risk. All rights to the name **Citavi** and any logos used are owned by **Swiss Academic Software GmbH**.

## License

This project is licensed under the [MIT](LICENSE) License
# PDFSplitAddon

This add-on adds a new function to the context menu of local PDF files. This function allows you to cut parent PDFs for their child titles.

## Releases

The compiled library can be found under [releases](./../../releases) as an archive.

## Usage

Note: This add-on can only be used with local (!) projects, not with cloud projects. It is also important, that this add-on can only be used with contributions in parent references. This add-on extracts the required pages from the entire PDF of the book and assigns them as an attachment to each contribution.

Please follow these steps:

1. Install the update to the current version of Citavi 6 [Download](https://www.citavi.com/download). You can also [check here](https://www.citavi.com/beta) to see if a beta version is available that contains all the latest bug fixes.
2. Close Citavi 6.
3. On the [add-on-page](https://github.com/lutz/PDFSplitAddon), click on [releases](https://github.com/lutz/PDFSplitAddon/releases) in the `Release` section and download the ZIP file of the add-on linked there.
4. Extract the add-on by right-clicking the ZIP file and clicking `Extract all`.
5. Copy all unzipped files into the directory `{installation directory of Citavi}\AddOns` (usually `C:\Program Files (x86)\Citavi 6\AddOns`). If you have not yet installed manual add-ons, you must first create the subfolder `Addons` yourself. <img width="766" alt="Add-on - PDFSplitAddon - Ansicht nach dem Kopieren der extrahierten Dateien" src="https://user-images.githubusercontent.com/31404555/115747883-f3c28c00-a395-11eb-91d8-26f34cde9be4.png">
6. Start Citavi 6 again and open you local project.
7. Add the edited book including the PDF file and all contributions you need, see [manual](https://www1.citavi.com/sub/manual6/en/index.html?101_adding_a_contribution_in_an_edited_book.html).
8. In the `Reference` tab of the edited book, right-click on the PDF file and click `Split PDF`. <img width="664" alt="Add-on - PDFSplitAddon - EN" src="https://user-images.githubusercontent.com/31404555/115747710-cd9cec00-a395-11eb-9566-8a17202dd40c.png">
9. Select the contributions for which a PDF should be created from the corresponding pages. Be sure to enter the physical page numbers if, for example, the book contains some page sections in Roman numerals or the logical pages (the printed page number on each page) differ for other reasons.
10. Click `OK`.

## Disclaimer

>There are no support claims by the company **Swiss Academic Software GmbH**, the provider of **Citavi** or other liability claims for problems or data loss. Any use is at your own risk. All rights to the name **Citavi** and any logos used are owned by **Swiss Academic Software GmbH**.

## License

This project is licensed under the [MIT](LICENSE) License.
# PDFThumbnailAddon

This add-on inserts a page preview in the search bar of Citavi's PDF Viewer.

## Releases

The compiled library can be found under [releases](./../../releases) as an archive.

## Disclaimer

>There are no support claims by the company **Swiss Academic Software GmbH**, the provider of **Citavi** or other liability claims for problems or data loss. Any use is at your own risk. All rights to the name **Citavi** and any logos used are owned by **Swiss Academic Software GmbH**.

## License

This project is licensed under the [MIT](LICENSE) License
# RemoveLocalProjectAddon

This add-on adds a <kbd>Remove project..</kbd> command to the **...** dialog of each **local** project entry on the start form. The command delete the **Attachements folder** and the **parent folder** of the `*.ctv` file.

## Releases

The compiled library can be found under [releases](./../../releases) as an archive.

## Disclaimer

>There are no support claims by the company **Swiss Academic Software GmbH**, the provider of **Citavi** or other liability claims for problems or data loss. Any use is at your own risk. All rights to the name **Citavi** and any logos used are owned by **Swiss Academic Software GmbH**.

## License

This project is licensed under the [MIT](LICENSE) License
# SetPDFSelectionAsAddon

This add-on adds new commands to the **More** menu of Citavi's PDF Viewer to take the text selection as title data.

## Releases

The compiled library can be found under [releases](./../../releases) as an archive.

## Disclaimer

>There are no support claims by the company **Swiss Academic Software GmbH**, the provider of **Citavi** or other liability claims for problems or data loss. Any use is at your own risk. All rights to the name **Citavi** and any logos used are owned by **Swiss Academic Software GmbH**.

## License

This project is licensed under the [MIT](LICENSE) License
# SynchronizeFiltersWithFullscreenPreviewAddon

This add-on synchronizes the list of filtered titles with all open full-screen previews of the same project. This allows you to use the function **Export PDF annotations...** in the full screen preview for selected titles as well.

## Releases

The compiled library can be found under [releases](./../../releases) as an archive.

## Disclaimer

>There are no support claims by the company **Swiss Academic Software GmbH**, the provider of **Citavi** or other liability claims for problems or data loss. Any use is at your own risk. All rights to the name **Citavi** and any logos used are owned by **Swiss Academic Software GmbH**.

## License

This project is licensed under the [MIT](LICENSE) License
# AutoRefAddon

This add-on adds a new function to the MacroEditor of Citavi to include directives of custom referenced assemblies. Everytime the user save the macro code the addon adds comments to the code file. When the user reopen the macro the comments will be removed and the assembly will be add to the internal macro editor compiler service.

## Format of comment

```csharp

// autoref "[ASSEMBLYPATH]"

```

## Releases

The compiled library can be found under [releases](./../../releases) as an archive.

## Disclaimer

>There are no support claims by the company **Swiss Academic Software GmbH**, the provider of **Citavi** or other liability claims for problems or data loss. Any use is at your own risk. All rights to the name **Citavi** and any logos used are owned by **Swiss Academic Software GmbH**.

## License

This project is licensed under the [MIT](LICENSE) License
# CitaviAddOnEx

This repository contains a class library that extends the addon programming model of Swiss Academic Citavi to support all dialogs inherited from the `FormBase` class.

## Getting Started

### Prerequisites

The simplest way to program an add-on for Citavi with this library is to include the latest release from [nuget.org](https://www.nuget.org/packages/CitaviAddOnEx/1.0.3) and ship it with it. Citavi should be installed in the default directory (`C:\Program Files (x86)\Citavi 6`). The Community Edition of Microsoft Visual Studio 2019 can be used as the development environment. 

The target framework used under Citavi 6 is the .net Framework 4.6.1.

### Programming

```csharp
using SwissAcademic.Citavi.Shell;
using SwissAcademic.Controls;
using System;
using System.Windows.Forms;

namespace [NAMESPACE]
{
    public class [CLASSNAME] : CitaviAddOnEx<T>
    {
        // Called through System.Windows.Forms.Application.Idle event and can used to check if as example button states changed
        public override void OnApplicationIdle(T form)
        {

        }
       
        // Called for every form of T when its load
        public override void OnHostingFormLoaded(T form)
        {
           
        }
        
        // Called for every form of T when its close
        public virtual void OnHostingFormClosed(T form) 
        { 
           
        }

        // Called when user click on something in the form
        public override void OnBeforePerformingCommand(T form, BeforePerformingCommandEventArgs e)
        {
           
        }

        // Called when application language is changed
        public override void OnLocalizing(T form)
        {
            
        }
    }
}
```

To develop an addon you derive from the `CitaviAddOnEx<T>` class and implement the corresponding methods if required. `T` must be a Form derived from the Citavi model provided base class `FormBase`.

**Example**
- MainForm
- KnowledgeItemFileForm
- MacroEditor

If a form is specified that provides inherent add-on support, the class will use it.

## Wiki

Some extra informations you will find in the [wiki](../..//wiki)

## Projects

The [FormatCodeAddon](https://github.com/lutz/FormatCodeAddon) uses this library to extend the MacroEditor and can be viewed for assistance.

## Disclaimer

>There are no support claims by the company **Swiss Academic Software GmbH**, the provider of **Citavi** or other liability claims for problems or data loss. Any use is at your own risk. All rights to the name **Citavi** and any logos used are owned by **Swiss Academic Software GmbH**.

## License

This project is licensed under the [MIT](LICENSE) License
# CopyTextOfSelectedAnnotationAddon

This add-on adds a new function to the PDF viewer of Citavi to copy the text of a selected Citavi highlight. Select **one** Citavi Highlight and use the key combination <kbd>SHIFT</kbd>+<kbd>C</kbd> to copy the text to the clipboard.

The following Citavi highlights are supported:

- *Direct quotation*
- *Indirect quotation*
- *Summary*
- *Comment*
- *Task*
- *Abstract*
- *Table of contents*
- *Highlight*
- *Highlight in red*

## Releases

The compiled library can be found under [releases](./../../releases) as an archive.

## Disclaimer

>There are no support claims by the company **Swiss Academic Software GmbH**, the provider of **Citavi** or other liability claims for problems or data loss. Any use is at your own risk. All rights to the name **Citavi** and any logos used are owned by **Swiss Academic Software GmbH**.

## License

This project is licensed under the [MIT](LICENSE) License
# DocFetcherSelectionAddon

This add-on adds a command in the **Edit** menu to convert DocFetcher found files via clipboard to a selection of titles in Citavi.

## Releases

The compiled library can be found under [releases](./../../releases) as an archive.

## Disclaimer

>There are no support claims by the company **Swiss Academic Software GmbH**, the provider of **Citavi** or other liability claims for problems or data loss. Any use is at your own risk. All rights to the name **Citavi** and any logos used are owned by **Swiss Academic Software GmbH**.

## License

This project is licensed under the [MIT](LICENSE) License
# FilterOpenProjectsAddon

This add-on adds the possibility to Citavis open project dialog to filter the list of projects by name.

![Test](/assets/screenshot.png)

## Releases

The compiled library can be found under [releases](./../../releases) as an archive.

## Disclaimer

>There are no support claims by the company **Swiss Academic Software GmbH**, the provider of **Citavi** or other liability claims for problems or data loss. Any use is at your own risk. All rights to the name **Citavi** and any logos used are owned by **Swiss Academic Software GmbH**.

## License

This project is licensed under the [MIT](LICENSE) License
# GoToPdfPageAddon

This add-on adds a new command **Jump to PDF page** as keyboard shortcut <kbd>CTRL</kbd>+<kbd>J</kbd> to jump to the physical or, if available, logical page numbers of the currently opened PDF document in the preview.

## Releases

The compiled library can be found under [releases](./../../releases) as an archive.

## Disclaimer

>There are no support claims by the company **Swiss Academic Software GmbH**, the provider of **Citavi** or other liability claims for problems or data loss. Any use is at your own risk. All rights to the name **Citavi** and any logos used are owned by **Swiss Academic Software GmbH**.

## License

This project is licensed under the [MIT](LICENSE) License
# HideKnowledgeItemFileFormHelpBoxAddon

This add-on hides the help box in the image quote edit or file quote edit dialog. This is especially useful when using Citavi on small screens.

## Releases

The compiled library can be found under [releases](./../../releases) as an archive.

## Disclaimer

>There are no support claims by the company **Swiss Academic Software GmbH**, the provider of **Citavi** or other liability claims for problems or data loss. Any use is at your own risk. All rights to the name **Citavi** and any logos used are owned by **Swiss Academic Software GmbH**.

## License

This project is licensed under the [MIT](LICENSE) License
# HideKnowledgeItemTextFormHelpBoxAddon

This add-on hides the help box in the quote edit dialog. This is especially useful when using Citavi on small screens.

## Releases

The compiled library can be found under [releases](./../../releases) as an archive.

## Disclaimer

>There are no support claims by the company **Swiss Academic Software GmbH**, the provider of **Citavi** or other liability claims for problems or data loss. Any use is at your own risk. All rights to the name **Citavi** and any logos used are owned by **Swiss Academic Software GmbH**.

## License

This project is licensed under the [MIT](LICENSE) License
# PDFSplitAddon

Dieses Add-on fügt dem Kontextmenü lokaler PDF-Dateien eine neue Funktion hinzu. Mit dieser Funktion können Sie bei den PDF-Dateien eines übergeordneten Werks die einzelnen Abschnitte für die untergeordneten Titel ausschneiden.

## Veröffentlichungen 

Die kompilierte Bibliothek finden Sie unter [releases](./../../releases) als Archiv. 

## Anwendung

Hinweis: Dieses Add-On kann nur mit lokalen (!) Projekten verwendet werden, nicht mit Cloud-Projekten. Es ist auch wichtig zu wissen, dass dieses Add-On nur bei übergeordneten Werken, die untergeordnete Titel besitzen, verwendet werden kann. Dieses Add-On extrahiert die erforderlichen Seiten aus dem gesamten PDF des Buches und weist sie jedem Beitrag als Anhang zu. Den Seitenbereich der Beiträge erfassen Sie bitte zuvor jeweils beim Beitrag im Feld `Seiten von-bis`.

Bitte gehen Sie folgendermaßen vor:

1. Falls noch nicht geschehen bzw. Sie mit einer älteren Citavi-6-Version arbeiten, nehmen Sie das Update auf die aktuelle Version von Citavi vor. Wenn das Update nicht automatisch angeboten wird, können Sie das aktuelle Setup unter https://www.citavi.com/download herunterladen und direkt installieren (eine vorherige Deinstallation ist nicht notwendig). Alle mit Citavi gesammelten Daten bleiben unverändert. Sie können auch [hier](https://www.citavi.com/beta) nachsehen, ob eine Beta-Version verfügbar ist, die alle neuesten Fehlerkorrekturen enthält.
2. Schließen Sie Citavi.
3. Klicken Sie auf der [Add-on-Seite](https://github.com/lutz/PDFSplitAddon) im Abschnitt `Release` auf den Link [releases](https://github.com/lutz/PDFSplitAddon/releases) und laden die dort verlinkte ZIP-Datei des Add-ons herunter.
4. Führen Sie auf der heruntergeladenen ZIP-Datei einen Rechtsklick aus und wählen Sie `Alle extrahieren`, um die Datei zu entpacken.
5. Kopieren Sie alle entpackten Dateien in das Verzeichnis `{Installationsverzeichnis von Citavi}\AddOns` (normalerweise `C:\Program Files (x86)\Citavi 6\AddOns`). Wenn Sie noch keine manuellen Add-ons installiert haben, müssen Sie den Unterordner `AddOns` zunächst selbst anlegen. Anschließend sollte es folgendermaßen aussehen: <img width="766" alt="Add-on - PDFSplitAddon - Ansicht nach dem Kopieren der extrahierten Dateien" src="https://user-images.githubusercontent.com/31404555/115750654-af84bb00-a398-11eb-98be-2e330e8e393a.png">
6. Starten Sie Citavi wieder und öffnen Sie Ihr lokales (!) Projekt.
7. Nehmen Sie das Sammelwerk inkl. der PDF-Datei und alle erwünschten Beiträge daraus auf, falls noch nicht geschehen, s. [Handbuch](https://www1.citavi.com/sub/manual6/de/index.html?101_adding_a_contribution_in_an_edited_book.html)
8. Führen Sie beim übergeordneten Sammelwerk im Reiter `Titel` ganz unten auf dem PDF-Dokument einen Rechtsklick aus und klicken Sie im Kontextmenü auf den Eintrag `PDF teilen`. <img width="664" alt="Add-on - PDFSplitAddon - DE" src="https://user-images.githubusercontent.com/31404555/115750674-b6133280-a398-11eb-9eed-bd7b99720ca8.png">
9. Wählen Sie die Beiträge aus, für die ein PDF anhand der ausgewählten Seiten erstellt werden soll. Achten Sie darauf, die physischen Seitenzahlen einzugeben, wenn das Buch z.B. einige Seitenabschnitte in römischen Zahlen enthält oder die logischen Seiten (die gedruckte Seitenzahl auf jeder Seite) aus anderen Gründen abweichen.
10. Klicken Sie `OK`.

## Disclaimer

> Es bestehen keine Supportansprüche gegenüber dem Unternehmen **Swiss Academic Software GmbH**, dem Anbieter von **Citavi**, oder andere Haftungsansprüche für Probleme oder Datenverlust. Jede Verwendung erfolgt auf eigenes Risiko. Alle Rechte an dem Namen **Citavi** und den verwendeten Logos liegen bei der **Swiss Academic Software GmbH**. 

## License

Dieses Projekt ist unter der [MIT](LICENSE)-Lizenz lizenziert.
# AddCitaviProjectToRecentListAddon

This add-on adds the current project to the list of recently used files at the application icon in the taskbar. Only **desktop** projects are supported!

## Releases

The compiled library can be found under [releases](./../../releases) as an archive.

## Disclaimer

>There are no support claims by the company **Swiss Academic Software GmbH**, the provider of **Citavi** or other liability claims for problems or data loss. Any use is at your own risk. All rights to the name **Citavi** and any logos used are owned by **Swiss Academic Software GmbH**.

## License

This project is licensed under the [MIT](LICENSE) License
