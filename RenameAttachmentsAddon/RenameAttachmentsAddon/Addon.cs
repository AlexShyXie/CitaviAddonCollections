using System;
using System.Collections.Generic;
using System.Windows.Forms;
using SwissAcademic.Citavi;
using SwissAcademic.Citavi.Shell;
using SwissAcademic.Controls;

namespace RenameAttachmentsAddon
{
	// Token: 0x02000002 RID: 2
	internal class Addon : CitaviAddOn<MainForm>
	{
		// Token: 0x06000001 RID: 1 RVA: 0x00002050 File Offset: 0x00000250
		public override void OnHostingFormLoaded(MainForm mainForm)
		{
			base.OnHostingFormLoaded(mainForm);
			this.mainForm = mainForm;
			CommandbarButton commandbarButton = mainForm.GetReferenceEditorElectronicLocationsCommandbarManager().GetCommandbar(MainFormReferenceEditorElectronicLocationsCommandbarId.Toolbar).GetCommandbarMenu(MainFormReferenceEditorElectronicLocationsCommandbarMenuId.Tools)
				.AddCommandbarButton(Addon.locationRenameCommandKey, Addon.locationRenameCommandName, 1, IconResources.ic_more_rename);
			commandbarButton.HasSeparator = true;
			commandbarButton.Shortcut = Shortcut.F3;
		}

		// Token: 0x06000002 RID: 2 RVA: 0x000020A8 File Offset: 0x000002A8
		public override void OnBeforePerformingCommand(MainForm form, BeforePerformingCommandEventArgs e)
		{
			bool flag = e.Key == Addon.locationRenameCommandKey;
			if (flag)
			{
				e.Handled = true;
				this.renameAttachments();
			}
			base.OnBeforePerformingCommand(form, e);
		}

		// Token: 0x06000003 RID: 3 RVA: 0x000020E4 File Offset: 0x000002E4
		public void renameAttachments()
		{
			try
			{
				MainForm primaryMainForm = Program.ActiveProjectShell.PrimaryMainForm;
				Reference activeReference = primaryMainForm.ActiveReference;
				string text = activeReference.ShortTitle;
				bool flag = !string.IsNullOrEmpty(activeReference.Date);
				if (flag)
				{
					string text2 = activeReference.Date.Split(new string[] { "/" }, StringSplitOptions.RemoveEmptyEntries)[2];
					text = text.Replace(activeReference.Date, text2);
				}
				int num = text.IndexOf("– ");
				text = text.Substring(0, num + 2) + activeReference.Title.Replace(':', ' ').Replace('?', ' ');
				Uri activeUri = primaryMainForm.PreviewControl.ActiveUri;
				primaryMainForm.PreviewControl.ShowNoPreview();
				int num2 = 0;
				List<Location> list = new List<Location>();
				foreach (Location location in activeReference.Locations)
				{
					list.Add(location);
				}
				for (int i = 0; i < list.Count; i++)
				{
					Location location2 = list[i];
					LinkedResource address = location2.Address;
					bool flag2 = address.LinkedResourceType == 1;
					if (flag2)
					{
						string[] array = location2.ToString().Split(new char[] { '.' });
						string text3 = array[array.Length - 1];
						string text4 = text;
						bool flag3 = num2 > 0;
						if (flag3)
						{
							text4 = text + "_" + num2.ToString();
						}
						text4 = text4 + "." + text3;
						address.Rename(text4, false);
						num2++;
					}
				}
				primaryMainForm.PreviewControl.ShowLocationPreview(activeReference.Locations[0], 0, true);
			}
			catch (Exception ex)
			{
				MessageBox.Show(ex.ToString());
			}
		}

		// Token: 0x04000001 RID: 1
		private static string locationRenameCommandKey = "Location.Rename.Command.Attachment";

		// Token: 0x04000002 RID: 2
		private static string locationRenameCommandName = "Rename attachments";

		// Token: 0x04000003 RID: 3
		private MainForm mainForm;
	}
}
