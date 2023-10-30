using SwissAcademic.Citavi.Shell;
using System;

namespace HideKnowledgeItemFileFormHelpBox
{
    public class Addon : CitaviAddOn<KnowledgeItemFileForm>
    {
        #region Methods

        public override void OnHostingFormLoaded(KnowledgeItemFileForm knowledgeItemFileForm)
        {
            try
            {
                knowledgeItemFileForm.HelpBox.Hide();
            }
            catch (Exception) { }
        }

        #endregion
    }
}