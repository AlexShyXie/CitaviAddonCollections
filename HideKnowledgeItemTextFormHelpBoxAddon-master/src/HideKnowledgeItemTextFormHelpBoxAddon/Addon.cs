using SwissAcademic.Citavi.Shell;
using System;

namespace HideKnowledgeItemTextFormHelpBox
{
    public class Addon : CitaviAddOn<KnowledgeItemTextForm>
    {
        #region Methods

        public override void OnHostingFormLoaded(KnowledgeItemTextForm knowledgeItemTextForm)
        {
            try
            {
                knowledgeItemTextForm.HelpBox.Hide();
            }
            catch (Exception){}
        }

        #endregion
    }
}