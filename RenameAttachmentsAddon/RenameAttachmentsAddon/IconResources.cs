using System;
using System.CodeDom.Compiler;
using System.ComponentModel;
using System.Diagnostics;
using System.Drawing;
using System.Globalization;
using System.Resources;
using System.Runtime.CompilerServices;

namespace RenameAttachmentsAddon
{
	// Token: 0x02000003 RID: 3
	[GeneratedCode("System.Resources.Tools.StronglyTypedResourceBuilder", "16.0.0.0")]
	[DebuggerNonUserCode]
	[CompilerGenerated]
	internal class IconResources
	{
		// Token: 0x06000006 RID: 6 RVA: 0x0000231B File Offset: 0x0000051B
		internal IconResources()
		{
		}

		// Token: 0x17000001 RID: 1
		// (get) Token: 0x06000007 RID: 7 RVA: 0x00002328 File Offset: 0x00000528
		[EditorBrowsable(EditorBrowsableState.Advanced)]
		internal static ResourceManager ResourceManager
		{
			get
			{
				bool flag = IconResources.resourceMan == null;
				if (flag)
				{
					ResourceManager resourceManager = new ResourceManager("RenameAttachmentsAddon.IconResources", typeof(IconResources).Assembly);
					IconResources.resourceMan = resourceManager;
				}
				return IconResources.resourceMan;
			}
		}

		// Token: 0x17000002 RID: 2
		// (get) Token: 0x06000008 RID: 8 RVA: 0x00002370 File Offset: 0x00000570
		// (set) Token: 0x06000009 RID: 9 RVA: 0x00002387 File Offset: 0x00000587
		[EditorBrowsable(EditorBrowsableState.Advanced)]
		internal static CultureInfo Culture
		{
			get
			{
				return IconResources.resourceCulture;
			}
			set
			{
				IconResources.resourceCulture = value;
			}
		}

		// Token: 0x17000003 RID: 3
		// (get) Token: 0x0600000A RID: 10 RVA: 0x00002390 File Offset: 0x00000590
		internal static Bitmap ic_more_rename
		{
			get
			{
				object @object = IconResources.ResourceManager.GetObject("ic_more_rename", IconResources.resourceCulture);
				return (Bitmap)@object;
			}
		}

		// Token: 0x04000004 RID: 4
		private static ResourceManager resourceMan;

		// Token: 0x04000005 RID: 5
		private static CultureInfo resourceCulture;
	}
}
