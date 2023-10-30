using SwissAcademic.Citavi.Shell;
using SwissAcademic.Controls;
using System.Windows.Forms;

namespace OpenFormsCenteredToParent
{
    public class Addon : CitaviAddOnEx<FormBase>
    {
        public override void OnHostingFormLoaded(FormBase formBase) => formBase.StartPosition = FormStartPosition.CenterParent;
    }
}